import Claim from '../models/claim.model.js';


// Fonction pour créer une nouvelle réclamation
export const createClaim = async (req, res) => {
  try {
    const { title, description } = req.body;
    const claimerId = req.user.id
    const claim = new Claim({
      title,
      description,
      claimer: claimerId
    });
    
    await claim.save();
    res.status(201).json({ message: 'Réclamation créée avec succès', claim });
  } catch (error) {
    res.status(400).json({ error: 'Impossible de créer la réclamation', message: error.message });
  }
}

// Fonction pour récupérer toutes les réclamations
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message });
  }
}

// Fonction pour récupérer une réclamation par son ID
export const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);
    if (!claim) {
      return res.status(404).json({ error: 'Réclamation non trouvée' });
    }
    res.status(200).json(claim)
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message });
  }
}

// Fonction pour mettre à jour une réclamation
export const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);
    if (!claim) {
      return res.status(404).json({ error: 'Réclamation non trouvée' });
    }

    if (claim.claimer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    Object.assign(claim, req.body)
    await claim.save()
    res.status(200).json({ message: 'Réclamation mise à jour avec succès', claim });
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message });
  }
}

// Fonction pour supprimer une réclamation
export const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.claimId)
    if (!claim) {
      return res.status(404).json({ error: 'Réclamation non trouvée' })
    }
    res.status(201).json({ message: 'Réclamation supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message })
  }
}

// Fonctions pour avoir une reclamation par l'id d'un user

export const getClaimByUserId = async (req, res) => {
  try {
    const claims = await Claim.find({ claimer : req.params.userId});
    if (!claims) {
      return res.status(404).json({ error: 'User dont have claims' });
    }
    res.status(200).json(claims)
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message });
  }
}

export const changeStatus = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId)
    if (!claim) {
      return res.status(404).json({ error: 'claim not found' });
    }
    claim.status = req.body.status
    await claim.save()
    return res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message });
  }
}
