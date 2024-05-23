import Video from '../models/video.model.js';

// Create a new video
export const createVideo = async (req, res) => {
  const video = new Video(req.body);
  await video.save();
  res.status(201).json(video);
};

// Get all videos
export const getAllVideos = async (req, res) => {
  const videos = await Video.find().populate('course');
  res.json(videos);
};

// Get a single video by id
export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id).populate('course');
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  res.json(video);
};

// Update a video by id
export const updateVideoById = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  res.json(video);
};

// Delete a video by id
export const deleteVideoById = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  res.json({ message: 'Video deleted' });
};
