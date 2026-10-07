import mongoose, { Document, Schema } from 'mongoose';


// TypeScript interface for a Post
export interface IPost extends Document {
  authorId: mongoose.Types.ObjectId;
  content: string;
  image?: string;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

// Why both mongoose.Types.ObjectId and Schema.Types.ObjectId?
// They are used in different places:

// Schema.Types.ObjectId is used inside the schema definition to tell MongoDB what type to store.
// mongoose.Types.ObjectId is used in TypeScript interfaces to describe the value type.
// Example:


// This is just TypeScript saying: “this field is an ObjectId”.


// Mongoose schema
const postSchema = new Schema<IPost>(
  {
    // The user who created the post
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User', //ref: 'User' tells Mongoose this is a relationship to the User collection
      required: true,
    },

    // Post text
    content: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional image URL
    image: {
      type: String,
    },

    // Users who liked the post
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // likes: [
    //     "64c8f0b3f1a2b3c4d5e6f7a8",
    //     "64c8f0b3f1a2b3c4d5e6f7a9"
    // ]
  },

  {
    timestamps: true,
  }
);


// Create the Mongoose model
const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;