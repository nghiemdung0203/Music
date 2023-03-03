const cloudinary = require("./cloudinary");
const User = require("../../models/users");
const Song = require("../../models/Songs");
const iconv = require("iconv-lite");
const jsmediatags = require("jsmediatags");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");



module.exports.getSpecifySong = async (req, res) => {
  const titleSong = req.query.titleSong;
  try {
    const result = await cloudinary.api.resource(titleSong, {
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
    Song.find({}).then((result) => {
      res.status(200).send(result);
    })
  } catch (error) {
    console.log(error);
  }
};

module.exports.createSong = async (req, res) => {


  const mp3Path = req.file.path;
  const now = new Date();


  //adjust the font of the originalname
  const originalnameBuffer = Buffer.from(req.file.originalname, "binary");
  const originalname = iconv.decode(originalnameBuffer, "utf-8");

  const imagePath = `thumbnails/${originalname}.png`;
  let imageUrl = '';

  jsmediatags.read(mp3Path, {
    onSuccess: function (tag) {
      if (tag && tag.tags.picture) {
        var tags = tag.tags;
        const pictureData =  Buffer.from(tags.picture.data);
        // Create a new Sharp object from the picture data
        const img = sharp(pictureData);

        // Resize the image and save it to a file
        img
          .resize(100, 100)
          .toFile(imagePath, (err, info) => {
            if (err) {
              console.error(err);
            } else {
              cloudinary.uploader.upload(imagePath, (error, result) => {
                if (error) {
                  console.log(error);
                } else {
                  imageUrl = result.secure_url;
                  fs.unlink(imagePath, (error, res) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('unklinked');
                    }
                  })
                }
              })
            }
          });
      }
    },
    onError: function (error) {
      console.error("Error reading MP3 file:", error);
    },
  });

  const result = await cloudinary.uploader.upload(mp3Path, {
    resource_type: "video",
    format: "mp3",
    public_id: originalname,
  });

  const newSong = new Song({
    titleSong: originalname,
    Thumbnail: imageUrl,
    URL: result.secure_url,
    AuthorID: req.body.AuthorID || null,
    GenreID: req.body.GenreID || null,
    CreateAt: now,
  });

  try {
    const savedSong = await newSong.save();
    res.status(200).send(savedSong);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
