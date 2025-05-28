import express from 'express';
import { getAllPosts, createPost } from '../controllers/postController.js';
import Post from '../models/postModel.js';
import { deletePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    res.json(post);
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    res.status(500).json({ error: '게시글 조회 실패', details: error.message });
  }
});

export default router;