import Claim from '../models/claim.model.js';

export const createClaim = async (req, res) => {
  const claim = new Claim(req.body);
  await claim.save();
  res.status(201).json(claim);
};

export const getAllClaims = async (req, res) => {
  const claims = await Claim.find().populate('author');
  res.json(claims);
};

export const getClaimById = async (req, res) => {
  const claim = await Claim.findById(req.params.id).populate('author');
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found' });
  }
  res.json(claim);
};

export const updateClaimById = async (req, res) => {
  const claim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found' });
  }
  res.json(claim);
};

export const deleteClaimById = async (req, res) => {
  const claim = await Claim.findByIdAndDelete(req.params.id);
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found' });
  }
  res.json({ message: 'Claim deleted' });
}