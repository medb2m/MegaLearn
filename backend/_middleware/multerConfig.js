import multer, { diskStorage } from 'multer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// les extensions à accepter image
const MIME_TYPES = {
    "images/jpg" : "jpg",
    "images/jpeg" : "jpg",
    "images/png" : "png",
}

// Les types MIME à accepter pour les vidéos
const VIDEO_MIME_TYPES = {
    "video/mp4": "mp4",
    "video/quicktime": "mov",
};

// Configuration de stockage pour les vidéos
const videoStorage = diskStorage({
    destination: (req, file, callback) => {
        const __dirname = dirname(fileURLToPath(import.meta.url)); // Récupérer le chemin du dossier courant 
        callback(null, join(__dirname, "../public/videos")); // Indiquer l'emplacement du stockage des vidéos
    },
    filename: (req, file, callback) => {
        // Remplacer les espaces par des underscores dans le nom de fichier original
        const name = file.originalname.split(" ").join("_");
        // Récupérer l'extension à utiliser pour le fichier vidéo
        const extension = VIDEO_MIME_TYPES[file.mimetype];
        // Ajouter un timestamp Date.now() au nom du fichier
        const nomFichier = Date.now() + name;
        callback(null, nomFichier);
    },
});

// Middleware Multer pour l'upload de vidéos
const uploadVideo = multer({
    storage: videoStorage,
    // Limite de taille maximale pour les vidéos (10 Mo par exemple)
    limits: { fileSize: 50 * 1024 * 1024 }, // Taille max des vidéos : 10 Mo
    // Filtre pour les types MIME autorisés pour les vidéos
    fileFilter: (req, file, callback) => {
        if (VIDEO_MIME_TYPES[file.mimetype]) {
            // Accepter le fichier si son type MIME correspond à l'un des types MIME vidéo définis
            callback(null, true);
        } else {
            // Rejeter le fichier si son type MIME n'est pas autorisé
            callback(new Error('Only video files with .mp4 or .mov extensions are allowed!'));
        }
    }
}).single("url"); // Le fichier est envoyé dans le body avec le nom/clé 'video'

// Middleware Multer existant pour l'upload d'images
const uploadImage = multer({
        //Configuration de stockage
        storage : diskStorage({
            //Configurer le nom avec lequel le fichier va etre enregistrer     
            destination : (req, file, callback) => {
                const __dirname = dirname(fileURLToPath(import.meta.url)) // Récupérer le chemin du dossier courant 
                callback(null, join(__dirname, "../public/images")) // indiquer l'emplacement du stockage
            },
            // Configuer le nom avec lequel le ficher sera enregistrer 
            filename : (req, file, callback) => {
                //Remplacer les espaces par des underscores
                const name = file.originalname.split(" ").join("_")
                //Récupérer l'extention à utiliser pour le fichier
                const extension = MIME_TYPES[file.mimetype]
                console.log(file.mimetype)
                //Ajouter un timestamp Date.now() au nom du fichier
                const nomF = Date.now() + name
                callback(null, nomF)
            },
        }),
        // Taille max des images 10 Mo
        limits : 10 * 1024 * 1024
}).single("image"); // Le fichier est envoyé dans le body avec le nom/clé 'image'

export { uploadImage, uploadVideo };
