const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads";

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        cb(null, dir);
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
router.post(
    "/add-tour",
    upload.single("image"),
    tourController.addTour
);

router.get("/get-tours", tourController.getTours);

module.exports = router;