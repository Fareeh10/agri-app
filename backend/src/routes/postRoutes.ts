import express from 'express';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const router = express.Router();
//Think of a router as a group of related endpoints.
// postRoutes
// │
// ├── GET    /api/posts
// ├── POST   /api/posts
// ├── DELETE /api/posts/:id
// └── PUT    /api/posts/:id

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find() //await means Wait for MongoDB to return the posts before continuing.
      .sort({ createdAt: -1 }) // Sort posts by creation date in descending order (newest first)
      .populate('authorId', 'name profileImage'); // Mongoose uses authorId's stored User ObjectId to fetch that User, then replaces authorId with { _id, name, profileImage } in the response.
    
    const commentCounts = await Comment.aggregate([
      {
        $group: {
          _id: '$postId', 
          count: { $sum: 1 }, 
        },
      },
    ]);

    //Takes all comments, group them according to their postId, and for each group count how many comments there are.
    // const commentCounts = [
    //   { _id: "postA", count: 3 },
    //   { _id: "postB", count: 5 },
    //   { _id: "postC", count: 1 }
    // ];

    const commentCountMap = commentCounts.reduce((acc, curr) => {
      //accumulator (acc) :  The result I’ve built so far. acc is initially an empty object {}. It will eventually become a map of postId to comment count.
      //current value (curr) :  The current element being processed in the array. curr is an object like { _id: "postA", count: 3 }.
      acc[curr._id.toString()] = curr.count; 
      return acc;
    }, {} as Record<string, number>); // "as Record<string, number>" in ts only
    // Record is a TypeScript utility type. It basically means: "An object where the keys have one type, and the values have another type.”
    // Here its “An object whose keys are strings and whose values are numbers.”
    // it is written as {} as Record<string, number> to tell TypeScript: "I know this is an empty object right now, but trust me, it will eventually be an object where the keys are strings and the values are numbers."

    // const commentCountMap = {
    //   postA: 3,
    //   postB: 5,
    //   postC: 1
    // };

    // Alternatively, you could use a for loop to build the commentCountMap instead of reduce:
    // const commentCountMap = {};
    // for (const curr of commentCounts) {
    //   commentCountMap[curr._id.toString()] = curr.count;
    // }

    const postsWithCommentCount = posts.map((post) => ({ // map() means Go through every item in an array and create a new array by transforming each item.
      ...post.toObject(), // Mongoose gives that document special methods and behavior like post.populate()/toObject() etc, toObject() means: Convert this Mongoose document into a normal JavaScript object.
      // ... is a spread operator which means give me everything that was already in the post, and then add one more property called commentCount
      commentCount: commentCountMap[post._id.toString()] || 0, // Add comment count to each post
    }));

    // It’s basically a shorter version of : 
    // const postsWithCommentCount = posts.map((post) => {
    //   return {
    //     ...post.toObject(),
    //     commentCount: commentCountMap[post._id.toString()] || 0,
    //   };
    // })

    res.json(postsWithCommentCount); // Send the posts with comment counts as JSON response
    // res.json(posts);

  } catch (error) {
    console.error('Error fetching posts:', error);

    res.status(500).json({
      message: 'Failed to fetch posts',
    });
  }
});

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    const { authorId, content, image } = req.body;

    const post = await Post.create({
      authorId,
      content,
      image,
    });

    res.status(201).json(post);

  } catch (error) {
    console.error('Error creating post:', error);

    res.status(500).json({
      message: 'Failed to create post',
    });
  }
});


export default router;