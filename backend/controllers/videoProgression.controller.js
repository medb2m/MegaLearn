// controllers/videoProgress.controller.js
import VideoProgress from '../models/videoProgress.model.js';
import Course from '../models/course.model.js';

// Mettre à jour la progression des vidéos
export const updateVideoProgress = async (req, res) => {
  try {
    const { userId, courseId, videoId } = req.body;

    let progress = await VideoProgress.findOne({ user: userId, course: courseId, video: videoId });

    if (!progress) {
      progress = new VideoProgress({ user: userId, course: courseId, video: videoId, watched: true });
    } else {
      progress.watched = true;
    }

    await progress.save();

    res.status(200).json({ message: 'Video progress updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating video progress', error: error.message });
  }
};

// Vérifier la complétion du cours
export const checkCourseCompletion = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const course = await Course.findById(courseId).populate('videos');
    const videoIds = course.videos.map(video => video._id);

    const progress = await VideoProgress.find({ user: userId, course: courseId, video: { $in: videoIds } });

    const watchedVideos = progress.filter(p => p.watched).map(p => p.video.toString());

    const allVideosWatched = videoIds.every(videoId => watchedVideos.includes(videoId.toString()));

    res.status(200).json({ allVideosWatched });
  } catch (error) {
    res.status(500).json({ message: 'Error checking course completion', error: error.message });
  }
};
