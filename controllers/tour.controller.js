const Tour = require("../models/Tour");

module.exports.addTour = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    try {

        const newTour = new Tour({
            name: req.body.name,
            location: req.body.location,
            price: req.body.price,
            days: req.body.days,
            description: req.body.description,
            image: req.file.filename
        });

        await newTour.save();

        res.json({
            message: "Thêm tour thành công",
            tour: newTour
        });
        return res.redirect("/contact.html");

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Lỗi server"
        });

    }

};

module.exports.getTours = async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.json({
            tours: tours
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};