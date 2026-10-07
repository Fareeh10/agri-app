import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// POST /api/comments
router.post('/', async (req, res) => {
  try {
    const { postId, authorId, content, parentCommentId } = req.body;

    const comment = await Comment.create({
      postId,
      authorId,
      content,
      parentCommentId,
    });

    res.status(201).json(comment);

  } catch (error) {
    console.error('Error creating comment:', error);

    res.status(500).json({
      message: 'Failed to create comment',
    });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate('authorId', 'name profileImage');

    res.json(comments);

  } catch (error) {
    console.error('Error fetching comments:', error);

    res.status(500).json({
      message: 'Failed to fetch comments',
    });
  }
});

export default router;