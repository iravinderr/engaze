import * as tf from "@tensorflow/tfjs";
import { prepareData } from "./data_preparation.ai.js";


export const createModel = async (numUsers, numPosts) => {
    model = tf.sequential();
    model.add(tf.layers.embedding({ inputDim: numUsers, outputDim: 8, inputLength: 1 }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: numPosts, activation: "softmax" }));

    model.compile({
        optimizer: "adam",
        loss: "sparseCategoricalCrossentropy",
        metrics: ["accuracy"],
    });
}

export const trainModel = async () => {
    const dataset = await prepareData();
    const userIds = dataset.map(d => d.userId);
    const postIds = dataset.map(d => d.postId);

    const xs = tf.tensor2d(userIds.map(id => parseInt(id)), [userIds.length, 1]);
    const ys = tf.tensor1d(postIds.map(id => parseInt(id)));

    await model.fit(xs, ys, {
        epochs: 50,
        batchSize: 32,
        shuffle: true,
    });
}

export const recommendPosts = (userId) => {
    const userTensor = tf.tensor2d([parseInt(userId)], [1, 1]);
    const predictions = model.predict(userTensor);
    const topPosts = predictions.argMax(-1).dataSync();

    return topPosts;
}