import { LIKE } from "../models/like.models.js"

export const prepareData = async () => {
    try {

        const likes = await LIKE.find({});
        const dataset = [];

        for (const like of likes) {
            dataset.push({
                userId: like.userId.toString(),
                postId: like.postId.toString(),
                tags: like.tags.join(",")
            });

            return dataset;
        }

    } catch (error) {
        console.log(`!!! ERROR IN DATA PREPARATION !!!`);
        console.log(error);
    }
}