import Entity from "../models/entity.model.js";


// Create a new entity
export const createEntity= async (req, res) => {
  try {
    const { 
        attribut_1,
        attribut_2,
        desc_attribut,
        num_attribut } = req.body

    const entityData = {
        attribut_1,
        attribut_2,
        desc_attribut,
        num_attribut
    }

    if (req.file) {
        entityData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }

    const entity = new Entity(entityData)
    await entity.save()
    res.status(201).json(entity)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all entities
export const getAllEntities = async (req, res) => {
    try { 
        const entities = await Entity.find()
        res.status(200).json(entities)
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}

// Get a single entity by id
export const getEntityById = async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.entityId)
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ message : error.message });
  }
};

// Update an entity by id
export const updateEntityById = async (req, res) => {
  try {
    const { 
        attribut_1,
        attribut_2,
        desc_attribut,
        num_attribut } = req.body

    const entityData = {
        attribut_1,
        attribut_2,
        desc_attribut,
        num_attribut
    }

    if (req.file) {
        entityData.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }

    const entity = await Entity.findByIdAndUpdate(req.params.entityId, entityData, { new: true })
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete an entity by id
export const deleteEntityById = async (req, res) => {
  try {
    const entity = await Entity.findByIdAndDelete(req.params.entityId);
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }
    res.status(204).json({ message: "Entity deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}