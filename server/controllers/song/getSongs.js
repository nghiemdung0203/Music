const cloudinary = require("./cloudinary");
const User = require("../../models/users");
const Song = require("../../models/Songs");
module.exports.getSpecifySong = async (req, res) => {
  const publicId = req.query.public_id;
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "video",
      format: "mp3",
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.getallSongs = async (req, res) => {
  try {
    const result = await cloudinary.api
      .resources({ resource_type: "video", format: "mp3" })
      .then((result) => {
        res.status(200).send(result);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createSong = async (req, res) => {
  const file = req.file;
  const path = req.file.path;
  const author = await User.findById(req.body.artist);
  const genre = req.body.genre;
  const result = await cloudinary.uploader.upload(path, {
    resource_type: "video",
    format: "mp3",
    public_id: req.file.originalname,
  });
  console.log(result)

  const newSong = new Song({
    title: result.public_id,
    artist: author,
    album: "none", // fix when add album features
    genre: genre,
    url: result.secure_url,
  });

  try {
    const savedSong = await newSong.save();
    res.status(200).send(savedSong);
  } catch (error) {
    res.status(500).send(error);
  }
};
