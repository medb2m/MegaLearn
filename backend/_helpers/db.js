import { config } from './config.js';
import mongoose from 'mongoose'

<<<<<<< HEAD
=======
// Options de connexion Mongoose
>>>>>>> origin/main
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

<<<<<<< HEAD

=======
// Connexion à MongoDB
>>>>>>> origin/main
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
<<<<<<< HEAD
        process.exit(1); // stop process if fails
    });

=======
        process.exit(1); // Arrêter le processus si la connexion échoue
    });

// Utilisation de Promise globale
>>>>>>> origin/main
mongoose.Promise = global.Promise;


// Fonction pour valider les ObjectId
export function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
