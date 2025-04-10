const Craft = require('../models/Craft');
const path = require('path');

exports.uploadCraft = async (req, res) => {
    try {
        const { title, description, category, steps, uploadedBy } = req.body;

        const imageFiles = req.files['images'] || [];
        const videoFiles = req.files['videos'] || [];

        const images = imageFiles.map(file => file.filename);
        const videos = videoFiles.map(file => file.filename);

        const craft = new Craft({
            title,
            description,
            category,
            steps: JSON.parse(steps), // if steps sent as JSON array string
            uploadedBy,
            images,
            videos
        });

        await craft.save();
        res.status(201).json({ message: 'Craft uploaded successfully', craft });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllCrafts = async (req, res) => {
    try {
        const crafts = await Craft.find().populate('uploadedBy', 'name email');
        res.json(crafts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
