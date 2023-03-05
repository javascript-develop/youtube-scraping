const mongoose = require("mongoose");

const subscribeShema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter product Description"],
    },

});

const subscribeModal = new mongoose.model("subscribe", subscribeShema);

module.exports = subscribeModal;