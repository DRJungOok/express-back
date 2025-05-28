import Post from '../models/postModel.js';

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const skip = (page - 1) * size;

    console.log('[getAllPosts] page:', page, 'size:', size);

    const totalCount = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    res.json({
      posts,
      totalPages: Math.ceil(totalCount / size),
    });
  } catch (error) {
    console.error('게시글 조회 실패:', error);
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

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deletePost = await Post.findByIdAndDelete(id);
    if(!deletePost) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    }
  } catch(e) {
    console.error('게시글 삭제 중 오류 발생:', e);
    res.status(500).json({ error: '게시글 삭제 중 오류가 발생했습니다.' });
  }
}