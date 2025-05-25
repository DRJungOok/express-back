import Post from '../models/postModel.js';

export const getAllPosts = async (res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: '게시글 조회 실패', details: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: '게시글 작성 실패' });
    }
};
