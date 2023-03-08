const mongoose = require("mongoose");

const database = () => {

      const uri = "mongodb+srv://programmerrubel2018:VRLqJlZzHeWhdzlKrsss@cluster0.fiall5r.mongodb.net/?retryWrites=true&w=majority"

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((data) => {
                  console.log("mongoose was cannect");
            })
            .catch((error) => {
                  console.log("this is error", error)
            })
}
module.exports = database