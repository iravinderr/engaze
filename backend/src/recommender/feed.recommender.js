import { USER } from "../models/user.models.js";
import { POST } from "../models/post.models.js";
import { LIKE } from "../models/like.models.js";
import { FOLLOW } from "../models/follow.models.js";
import natural from "natural"; // For NLP-based recommendations

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

    // Get posts liked by similar users (who like the same posts as the given user)
    const similarUserLikes = await LIKE.find({ 
        postId: { $in: likedPosts.map(like => like.postId._id) }, 
        userId: { $ne: userId } 
    }).populate("postId");

    const recommendedPosts = similarUserLikes.map(like => like.postId);
    return recommendedPosts;
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
        const similarityScore = natural.JaccardCoefficient(likedTokens, postTokens);
        return { post, score: similarityScore };
    });

    // Sort by highest similarity
    const recommendedPosts = postSimilarity.sort((a, b) => b.score - a.score).map(p => p.post);
    return recommendedPosts;
};


// Hybrid Recommendation: Combines collaborative and content-based filtering
export const recommendPosts = async (userId) => {
    const collabRecommendations = await collaborativeFiltering(userId);
    const contentRecommendations = await contentBasedFiltering(userId);

    // Merge both lists and remove duplicates
    const mergedRecommendations = [...new Set([...collabRecommendations, ...contentRecommendations])];
    return mergedRecommendations.slice(0, 10); // Return top 10 recommendations
};
