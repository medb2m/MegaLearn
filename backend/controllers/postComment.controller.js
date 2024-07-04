import Comment from '../models/postComment.model.js'

// Create a new comment
export const createComment = async (req, res) => {
  const comment = new Comment({
    ...req.body,
    author:req.user._id,
    post : req.params.postId
  })
  await comment.save()
  res.status(201).json(comment)
}

// Get all comments
export const getAllCommentsForPost = async (req, res) => {
  const comments = await Comment.find({ post : req.params.postId}).populate('content').populate('author', 'firstName lastName').populate('createdAt')
  res.json(comments)
}

// Get a single comment by id
export const getCommentById = async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('content').populate('author', 'firstName lastName').populate('createdAt')
  if (!comment) {
    return res.status(404).json({ message: 'comment not found' })
  }
  res.json(comment);
}

// Update a comment by id
export const updateCommentById = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' })
  }
  res.json(comment)
}

// Delete a comment by id
export const deleteCommentById = async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' })
  }
  res.json({ message: 'Comment deleted' })
}