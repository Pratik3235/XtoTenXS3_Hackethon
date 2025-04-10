const express = require('express');
const router = express.Router();
const { uploadCraft, getAllCrafts } = require('../controllers/craftController');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post(
    '/',
    upload.fields([
        { name: 'images', maxCount: 5 },
        { name: 'videos', maxCount: 2 }
    ]),
    uploadCraft
);

router.get('/', getAllCrafts);

module.exports = router;
