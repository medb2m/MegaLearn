import Video from '../models/video.model.js';

// Create a new video
export const createVideo = async (req, res) => {
  try {
    if (!req.file){
      return res.status(400).json({ message : 'Please upload a video'})
    }
    const video = new Video({
      title : req.body.title,
      url : `${req.protocol}://${req.get('host')}/vid/${req.file.filename}`,
      vidDescription: req.body.vidDescription
    })
    await video.save()
    res.status(201).json({ url : video.url})
  } catch (error){
    res.status(500).json({message : 'Error while uploading the video.'})
  }
}

// Fonction pour récupérer toutes les vidéos d'un cours spécifique
export const getAllVideosByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Recherche de toutes les vidéos associées au cours spécifié
    const videos = await Video.find({ course: courseId });

    // Vérification si des vidéos ont été trouvées
    if (!videos) {
      return res.status(404).json({ message: 'No videos found for this course' });
    }

    // Envoi des vidéos trouvées en réponse
    res.json(videos);
  } catch (error) {
    // Gestion des erreurs
    console.error('Error while retrieving videos by course ID:', error);
    res.status(500).json({ message: 'Error while retrieving videos by course ID' });
  }
};


// Get a single video by id
export const getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error while retrieving video by ID:', error);
    res.status(500).json({ message: 'Error while retrieving video by ID' });
  }
};

// Delete a video By ID
export const deleteVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error while deleting video by ID:', error);
    res.status(500).json({ message: 'Error while deleting video by ID' });
  }
};
