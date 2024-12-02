import mongoose, { Schema, Document, Model } from 'mongoose';
import { valid_username, valid_password } from '../utils';

export interface IUser extends Document {
    username: string;
    password: string;
    role: 'customer' | 'admin';
    avatar?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            validate: {
                validator: valid_username,
                message: (props: { value: string }) => `${props.value} is not a valid username!`,
            },
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            validate: {
                validator: valid_password,
                message: (props: { value: string }) => `${props.value} is not a valid password!`,
            },
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            enum: {
                values: ['customer', 'admin'],
                message: 'Role "{VALUE}" is not supported',
            },
            default: 'customer',
        },
        avatar: {
            type: String,
            default: 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-700-202768327.jpg',
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

// Create and Export User Model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;