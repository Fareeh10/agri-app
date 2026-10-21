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

router.post('/:commentId/:likeOrUnlike', async (req, res) => {
  try {

    const { userId } = req.body;
    const { commentId, likeOrUnlike } = req.params;

    // built-in Mongoose methods.
    // Comment.find()
    // Comment.findById()
    // Comment.findOne()
    // Comment.create()
    // Comment.findByIdAndUpdate()
    // Comment.findByIdAndDelete()

    let update;

    if (likeOrUnlike === 'like') {
      update = {
        $addToSet: { likes: userId },  // addToSet ensures that the userId is added only if it doesn't already exist in the likes array.
        // $push: { likes: userId }
      };
    } 
    else if (likeOrUnlike === 'unlike') {
      update = {
        $pull: { likes: userId },
      };
    } 
    else {
      return res.status(400).json({
        message: 'Invalid like action',
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate( 
      commentId,
      update,
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: 'Comment not found',
      });
    }

    res.json(updatedComment);

  } catch (error) {
    console.error('Error liking comment:', error);

    res.status(500).json({
      message: 'Failed to like comment',
    });
  }
});

export default router;