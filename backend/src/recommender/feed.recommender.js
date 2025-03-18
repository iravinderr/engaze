import * as tf from "@tensorflow/tfjs";
import natural from "natural";
import { POST } from "../models/post.models.js";
import { LIKE } from "../models/like.models.js";
import { FOLLOW } from "../models/follow.models.js";

// ======================================================= USING NATURAL.JS LIBRARY =======================================================

const tokenizer = new natural.WordTokenizer();

// Fetch user’s liked posts and followed users
const getUserInteractions = async (userId) => {
    const likedPosts = await LIKE.find({ userId }).populate("postId");
    const followedUsers = await FOLLOW.find({ follower: userId }).populate("followee");

    return { likedPosts, followedUsers };
};

// Collaborative Filtering: Recommends posts liked by similar users
const collaborativeFiltering = async (userId) => {
    const { likedPosts, followedUsers } = await getUserInteractions(userId);

    // Get posts liked by similar users (who liked the same posts as the given user)
    const similarUserLikes = await LIKE.find({ 
        postId: { $in: likedPosts.map(like => like.postId._id) }, 
        userId: { $ne: userId } 
    }).populate("postId");

    // Get posts from followed users
    const followedUserPosts = await POST.find({ author: { $in: followedUsers.map(user => user.followee._id) } });

    // Merge recommendations and return only post IDs
    const recommendedPostIds = new Set([
        ...similarUserLikes.map(like => like.postId._id.toString()),
        ...followedUserPosts.map(post => post._id.toString())
    ]);

    return Array.from(recommendedPostIds);
};

// Jaccard Similarity Calculation
const jaccardSimilarity = (setA, setB) => {
    const intersection = setA.filter(word => setB.includes(word)).length;
    const union = new Set([...setA, ...setB]).size;
    return union === 0 ? 0 : intersection / union;
};


// Content-Based Filtering: Recommends similar posts based on text (captions, tags)
const contentBasedFiltering = async (userId) => {
    const { likedPosts } = await getUserInteractions(userId);

    // Create a bag of words for liked posts
    const likedPostTexts = likedPosts.map(like => {
        return (like.postId.captions + " " + like.postId.tags.join(" ")).toLowerCase();
    });

    const likedTokens = likedPostTexts.flatMap(text => tokenizer.tokenize(text));

    // Find similar posts
    const allPosts = await POST.find();
    const postSimilarity = allPosts.map(post => {
        const postTokens = tokenizer.tokenize((post.captions + " " + post.tags.join(" ")).toLowerCase());
        const similarityScore = jaccardSimilarity(likedTokens, postTokens);
        return { postId: post._id.toString(), score: similarityScore };
    });

    // Sort by highest similarity and return only post IDs
    const recommendedPostIds = postSimilarity
        .sort((a, b) => b.score - a.score)
        .slice(0, 10) // Limit top 10
        .map(p => p.postId);

    return recommendedPostIds;
};

// Hybrid Recommendation: Combines collaborative and content-based filtering
const recommendPostsNatual = async (userId) => {
    const collabRecommendations = await collaborativeFiltering(userId);
    const contentRecommendations = await contentBasedFiltering(userId);

    // Merge both lists and remove duplicates
    const mergedRecommendations = new Set([...collabRecommendations, ...contentRecommendations]);
    
    return Array.from(mergedRecommendations);
};


// ======================================================= USING TENSERFLOW.JS LIBRARY =======================================================

// Function to convert tags into a one-hot encoding vector
const convertTagsToVector = (tags, allTags) => {
    const vector = new Array(allTags.length).fill(0);
    tags.forEach(tag => {
        const index = allTags.indexOf(tag);
        if (index !== -1) vector[index] = 1;
    });
    return vector;
};

// Function to build the recommender model
const buildRecommenderModel = (inputSize) => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, inputShape: [inputSize], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    return model;
};

// Hybrid Recommendation: Combines collaborative and content-based filtering
const recommendPostsTenserflow = async (userId) => {
    // Fetch user interactions
    const likedPosts = await LIKE.find({ userId }).populate('postId');
    const followedUsers = await FOLLOW.find({ follower: userId }).populate('followee');

    // Step 1: **Collaborative Filtering** (Users who liked the same posts)
    const similarUserLikes = await LIKE.find({ 
        postId: { $in: likedPosts.map(like => like.postId._id) }, 
        userId: { $ne: userId } 
    }).populate("postId");

    const followedUserPosts = await POST.find({ 
        author: { $in: followedUsers.map(user => user.followee._id) } 
    });

    // Step 2: **Content-Based Filtering** (Find similar posts based on tags)
    const likedTags = likedPosts.map(post => post.postId.tags).flat();
    const userTags = [...new Set([...likedTags, ...followedUserPosts.map(p => p.tags).flat()])];

    // Get all posts and their tags
    const allPosts = await POST.find();
    const allTags = [...new Set(allPosts.map(post => post.tags).flat())];

    // Convert posts into feature vectors
    const allPostsData = allPosts.map(post => ({
        postId: post._id,
        tagVector: convertTagsToVector(post.tags, allTags),
    }));

    // Create input data (user's preference vector) and output labels (post relevance)
    const inputData = allPostsData.map(postData => postData.tagVector);
    const outputData = allPostsData.map(postData => {
        const similarity = userTags.filter(tag => postData.tagVector[allTags.indexOf(tag)] === 1).length;
        return similarity > 0 ? 1 : 0; // 1 if post is relevant, 0 otherwise
    });

    // Train model only if needed
    let model;
    if (inputData.length > 0) {
        const inputTensor = tf.tensor(inputData);
        const outputTensor = tf.tensor(outputData);
        model = buildRecommenderModel(allTags.length);
        await model.fit(inputTensor, outputTensor, { epochs: 5 });
    }

    // Step 3: **Merge Collaborative & Content-Based Recommendations**
    let recommendedPostIds = new Set([
        ...similarUserLikes.map(like => like.postId._id.toString()),
        ...followedUserPosts.map(post => post._id.toString())
    ]);

    // Use ML model for content-based recommendations
    if (inputData.length > 0) {
        const predictions = model.predict(tf.tensor(inputData)).dataSync();
        const contentRecommendedPosts = allPostsData
            .filter((_, idx) => predictions[idx] > 0.5)
            .map(postData => postData.postId.toString());

        recommendedPostIds = new Set([...recommendedPostIds, ...contentRecommendedPosts]);
    }

    return Array.from(recommendedPostIds);
};


// ======================================================= FINAL USED FUNCTION =======================================================


export const recommendPosts = async (userId) => {
    // await recommendPostsNatual(userId);
    await recommendPostsTenserflow(userId);
}