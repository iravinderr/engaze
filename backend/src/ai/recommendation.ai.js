import * as tf from "@tensorflow/tfjs";
import { POST } from "../models/post.models.js";
import { LIKE } from "../models/like.models.js";
import { FOLLOW } from "../models/follow.models.js";

// Function to convert tags into a one-hot encoding vector (or other form of feature vector)
const convertTagsToVector = (tags, allTags) => {
    const vector = new Array(allTags.length).fill(0);
    tags.forEach(tag => {
        const index = allTags.indexOf(tag);
        if (index !== -1) vector[index] = 1;
    });
    return vector;
};

// Function to build the recommender model (for simplicity, we’ll keep it linear)
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

// Function to recommend posts based on user interactions
 const recommendPosts = async (userId) => {
    // Step 1: Get the tags of posts the user has liked
    const likedPosts = await LIKE.find({ userId }).populate('postId');
    const likedTags = likedPosts.map(post => post.postId.tags).flat();

    // Step 2: Get the tags of posts the user follows (posts from followed users)
    const followedUsers = await FOLLOW.find({ follower: userId }).populate('followee');
    const followedPosts = await POST.find({ author: { $in: followedUsers.map(user => user.followee._id) } });
    const followedTags = followedPosts.map(post => post.tags).flat();

    // Combine liked and followed tags
    const userTags = [...new Set([...likedTags, ...followedTags])];

    // Step 3: Get all available posts and convert them into vectors
    const allPosts = await POST.find().populate('author');
    const allTags = [...new Set(allPosts.map(post => post.tags).flat())]; // Get all unique tags
    const allPostsData = allPosts.map(post => ({
        postId: post._id,
        tagVector: convertTagsToVector(post.tags, allTags),
    }));

    // Step 4: Create input data (user's preference vector) and output (post recommendations)
    const inputData = allPostsData.map(postData => postData.tagVector);
    const outputData = allPostsData.map(postData => {
        const similarity = userTags.filter(tag => postData.tagVector[allTags.indexOf(tag)] === 1).length;
        return similarity > 0 ? 1 : 0; // 1 if the post is relevant, 0 if not
    });

    // Step 5: Train the model
    const inputTensor = tf.tensor(inputData);
    const outputTensor = tf.tensor(outputData);
    const model = buildRecommenderModel(allTags.length);

    await model.fit(inputTensor, outputTensor, { epochs: 5 });

    // Step 6: Make predictions
    const predictions = model.predict(inputTensor).dataSync();
    const recommendedPostIds = allPostsData.filter((_, idx) => predictions[idx] > 0.5).map(postData => postData.postId);

    return recommendedPostIds;
};


