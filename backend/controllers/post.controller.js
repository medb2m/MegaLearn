import Post from '../models/post.model.js'
<<<<<<< HEAD
import User from '../models/user.model.js'
import sendEmail from '../_helpers/send-email.js'

import path from 'path';
import { dirname } from 'path';

import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
=======
>>>>>>> siwarMerge

// Create a new post
export const createPost = async (req, res) => {
  try {
    if (!req.file){
      return res.status(400).json({ message : 'Please upload an image.'})
    }
    const post = new Post({
      title : req.body.title,
      content : req.body.content,
      author: req.user._id,
      image : `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    })
    await post.save()
<<<<<<< HEAD

    // Notify all users
    const imagePath = path.join(__dirname, '..' ,'public', 'images', `${req.file.filename}`);
    const users = await User.find();
    const emailPromises = users.map(user => {
      return sendEmail({
        to: user.email,
        subject: 'New Post Created',
        htmlContent: `<p>A new post titled "${post.title}" has been created.</p><p>${post.content}</p>`,
        imagePath : imagePath,
        attachmentPaths: [
          path.join(__dirname, '..' ,'assets', 'mail', 'images', 'image-1.png'), 
          path.join(__dirname, '..' ,'assets', 'mail', 'images', 'image-2.png'),
          path.join(__dirname, '..' ,'assets', 'mail', 'images', 'image-3.png'),
          path.join(__dirname, '..' ,'assets', 'mail', 'images', 'image-4.png'),
          path.join(__dirname, '..' ,'assets', 'mail', 'images', 'image-6.png')
        ]
      });
    });
    await Promise.all(emailPromises);

    res.status(201).json(post)
  } catch (error){
    res.status(500).json({message : 'Error while creating the post.', error})
=======
    res.status(201).json(post)
  } catch (error){
    res.status(500).json({message : 'Error while creating the post.'})
>>>>>>> siwarMerge
  }
}

// Get all posts
export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'firstName lastName')
  res.json(posts)
}

// Get a single post by id
export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('title').populate('content')
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.json(post);
}

// Update a post by id
export const updatePostById = async (req, res) => {
  try {
    const { title, content } =
      req.body;

    const postData = {
      title,
      content
    };

    if (req.file) {
      postData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, postData, { new: true });
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(204).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error Updating post", error: error.message });
  }
};

// Delete a category by id
export const deletePostById = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.json({ message: 'Post deleted' })
}