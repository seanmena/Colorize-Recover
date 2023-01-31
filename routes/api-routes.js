const express = require("express");
const router = express.Router();
// const port = 3000;
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const imageDirectory = "routes/uploads/";
const getColors = require("get-image-colors");
const db = require("../models");
const hexToHsl = require("hex-to-hsl");
const hsl = require("hsl-to-hex");

if (fs.existsSync("routes/uploads") === false) {
  fs.mkdirSync("routes/uploads");
}

const noAuth = ((req, res, next) => {
  if (req.user) {
    return next();
  } 
  return res.status(401).send("wrong");
});


router.get("/api/colors", noAuth, (req, res) => {
  console.log(req.user);
  console.log("testing.testing");
  db.colors.findAll({
  }).then((dbColors) => {
    const colorData = (dbColors[0].dataValues.hexcode);
    const obj = JSON.parse(colorData);
    res.json(obj);
    console.log(obj);
  })
    .catch(err => console.error(err));
});




fs.readdir(imageDirectory, (_err, files) => {
  console.log(_err, files);
  files.forEach((file) => {
    console.log(file);
    //if (err) throw err;
    try {
      const currentImage = imageDirectory + "/" + file;
      fs.unlinkSync(currentImage);
      //file removed
    } catch (err) {
      console.error(err);
    }
  });
});
  
router.post("/", noAuth, (req, res)=> {
  console.log("test");
  const form = new formidable.IncomingForm();
  
  form.parse(req);
  
  form.on("fileBegin", (name, file) => {
    file.path = __dirname + "/uploads/" + file.name;
  });
  
  form.on("file", (name, file) => {
    console.log("Uploaded file " + file.name);
    fs.readdir(imageDirectory, (_err, files) => {
      const imagePath = "uploads/" + file.name;
      files.forEach(() => {
        console.log("This is the file after upload " + imagePath);
        console.log("This is the potential path to evaluate " + imagePath);
        getColors(path.join(__dirname, imagePath)).then(colors => {
          //THESE ARE YOUR COLOR VALUES --> color.hex
          const hexcode = (colors.map(color => (color.hex())));
          const comphex = [];
          console.log(req.user.id);

          function makeComp (hex) {
            const makeHSL = hexToHsl(hex);
            console.log("This is the HSL " + makeHSL);

            const startingHue = makeHSL[0] - 1;
            const newHue = (startingHue + 180) % 360;
            //if ()
            console.log("This yo new HSL " + newHue + "," + makeHSL[1] + "," + makeHSL[1] );
            finalHex = hsl(newHue, makeHSL[1], makeHSL[2]);
            
            return finalHex;

          }

          hexcode.forEach ((hex) => {
            comphex.push(makeComp(hex));
          });
          console.log("These are the original hexes " + hexcode);
          console.log("These are the comphexes " + comphex);
          db.colors.create({
            UserId: req.user.id,
            hexcode: JSON.stringify(hexcode),
            complementary: JSON.stringify(comphex)
          });
        });
      });

      fs.readdir(imageDirectory, (_err, files) => {
        
        files.forEach((file, ) => {
          console.log(file);
          //if (err) throw err;
          try {
            const currentImage = imageDirectory + "/" + file;
            fs.unlinkSync(currentImage);
            //file removed
          } catch(err) {
            console.error(err);
          }
        });
        
      });
    });
    
  });
  // res.end();
  res.render(path.join(__dirname, "../views", "index.handlebars"));
  
});
  
module.exports = router;
