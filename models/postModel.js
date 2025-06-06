import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
    },
  content: {
    type: String,
    required: true
    },
  author: { 
    type: String, 
    default: 'anonymous' 
    },
  views: { 
    type: Number, 
    default: 0 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;