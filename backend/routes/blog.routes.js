import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    createComment,
    getAllComments,
    getCommentsByPostId,
    updateComment,
    deleteComment,
  } from "../controllers/controller.js";
  import { verifyToken } from "../middlewares/authJwt.js";
  
  export default function setupBlogRoutes(app) {
    // Middleware to set headers for CORS
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    // Routes for posts
    app.post('/posts', [verifyToken], createPost); // Create a new post
    app.get('/posts', getAllPosts); // Get all posts
    app.get('/posts/:id', getPostById); // Get a single post by ID
    app.put('/posts/:id', [verifyToken], updatePost); // Update a post
    app.delete('/posts/:id', [verifyToken], deletePost); // Delete a post
  
    // Routes for comments
    app.post('/comments', [verifyToken], createComment); // Create a new comment
    app.get('/comments', getAllComments); // Get all comments
    app.get('/comments/post/:postId', getCommentsByPostId); // Get comments by post ID
    app.put('/comments/:id', [verifyToken], updateComment); // Update a comment
    app.delete('/comments/:id', [verifyToken], deleteComment); // Delete a comment
  }
  