const mongoose = require("mongoose");

const database = () => {

      const uri = "mongodb+srv://rubelrana:ZYaNn4IhCJR2DdQR@cluster0.rm65m4m.mongodb.net/?retryWrites=true&w=majority"

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((data) => {
                  console.log("mongoose was cannect");
            })
            .catch((error) => {
                  console.log("this is error", error)
            })
}
module.exports = database