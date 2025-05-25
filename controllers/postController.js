import Post from '../models/Post.js';

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
}

exports.createPost = async(req, res) => {
    const {title, content} = req.body;
    const Post = new Post({title, content});
    await newPost.save();

    res.status(201).json(newPost);
}