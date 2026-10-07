import mongoose, { Document, Schema } from 'mongoose';


// TypeScript interface for a Comment
export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string;
  parentCommentId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Mongoose schema
const commentSchema = new Schema<IComment>(
  {
    // The post this comment belongs to
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },

    // The user who wrote the comment
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // The actual comment
    content: {
      type: String,
      required: true,
      trim: true,
    },

    // If this is a reply, this points to the parent comment.
    // Normal comments don't have a parent.
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },

  {
    timestamps: true,
  }
);


// Create the Mongoose model
// what is a Mongoose model ? - its a wrapper for the schema that provides an interface to the database for creating, querying, updating, and deleting records. It allows you to interact with the MongoDB collection associated with the schema.
// schema is a blueprint for the data structure, while the model is the actual implementation that allows you to perform operations on that data in the database.
const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;