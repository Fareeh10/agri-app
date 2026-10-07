import mongoose, { Document, Schema } from 'mongoose';


// TypeScript interface
// Describes the shape/type of a User in TypeScript.
// "extends Document" means IUser also has
// properties/features provided by a Mongoose Document.
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema
// Describes how the User will actually be stored in MongoDB.
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },
  },

  {
    // Automatically create createdAt and updatedAt
    timestamps: true,
  }
);


// Create a Mongoose model.
// "IUser" tells TypeScript what type of document
// this model represents.
// "User" is the model name.
// "userSchema" tells Mongoose which schema to use.
const User = mongoose.model<IUser>('User', userSchema);

export default User;