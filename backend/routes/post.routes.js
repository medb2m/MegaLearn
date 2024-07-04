import express from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/post.controller.js';
import { createComment, getAllCommentsForPost, getCommentById, updateCommentById, deleteCommentById } from '../controllers/postComment.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';
import {uploadImage} from '../_middleware/multerConfig.js';

const router = express.Router();

// Routes pour les posts
router.post('/posts', authorize(), uploadImage, createPost);
router.get('/posts', getAllPosts); 
router.get('/posts/:id', getPostById);
router.put('/posts/:id', authorize(), updatePostById);
router.delete('/posts/:id', authorize(Role.Admin), deletePostById);

// Routes pour les commentaires
router.post('/posts/comments/:postId', authorize(), createComment);
router.get('/posts/comments/:postId', getAllCommentsForPost);
router.get('/comments/:id', getCommentById);
router.put('/comments/:id', authorize(), updateCommentById);
router.delete('/comments/:id', authorize(), deleteCommentById);


export default router;
