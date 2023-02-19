const express = require('express');
const songRoutes = require('../controllers/song/getSongs');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });


router.get('/SpecSong', songRoutes.getSpecifySong)
router.get('/songs', songRoutes.getallSongs)
router.post('/createSong', upload.single('song'),songRoutes.createSong)

module.exports = router;