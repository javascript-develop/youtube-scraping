const mongoose = require("mongoose");

const database = () => {

      const uri = "mongodb+srv://testdb:k!r9qnFujyBvs!fsr@cluster0.cywshen.mongodb.net/?retryWrites=true&w=majority"

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((data) => {
                  console.log("mongoose was cannect");
            })
            .catch((error) => {
                  console.log("this is error", error)
            })
}
module.exports = database