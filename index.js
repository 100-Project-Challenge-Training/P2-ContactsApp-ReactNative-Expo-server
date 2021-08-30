const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Contact = require("./modal");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// app.get("/", (req, res) => {
//   res.send("welcome in my ammmaaazzzzzzing contacts app server =D");
// });

app.get("/", (req, res) => {
  Contact.find({})
    .then((data) => {
      console.log("get all data", res.send(data));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/create", (req, res) => {
  const { name, job, phone, email, img } = req.body;
  const contact = new Contact({
    name: name,
    job: job,
    phone: phone,
    email: email,
    img: img,
  });
  contact
    .save()
    .then((data) => {
      console.log(data);
      res.send("posted");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete", (req, res) => {
  Contact.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log("deleted", data);
      res.send("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  const { id, name, job, email, phone, img } = req.body;

  console.log("request", req.body);
  Contact.findByIdAndUpdate(
    id,
    {
      name,
      job,
      email,
      phone,
      img,
    },
    { new: true }
  )
    .then((data) => {
      console.log("updated", data);
      res.send("updated");
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected =P");
});
mongoose.connection.on("error", (err) => {
  console.log(`mongodb is nooooooot connected , ${err}`);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
