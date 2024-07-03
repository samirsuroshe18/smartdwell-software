const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()
require("./userDetails");
const path = require('path');
const app = express();

const staticPath = path.join(__dirname, '../client/dist');
console.log(staticPath)

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(staticPath))
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const User = mongoose.model("UserInfo");

app.get("/api", async (req, res) => {
  return res.send("Hello developer");
});

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType, building } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
      building,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email, building: user.building }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data:token, building: user.building});
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
      
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.get("/getAllUser", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { fname: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
        { building: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const allUser = await User.find(query);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ _id: userid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/paginatedUsers", async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalUser = allUser.length;
  results.pageCount = Math.ceil(allUser.length / limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results);
});



// Schema for bldgdata collection
const bldgDataSchema = new mongoose.Schema({
  locname: String,
  bldgname: String,
});
const BldgData = mongoose.model("BldgData", bldgDataSchema);

app.post("/addBuilding", async (req, res) => {
  const { locname, bldgname } = req.body;

  try {
    // Create a new document in bldgdata collection
    await BldgData.create({ locname, bldgname });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.get("/getBuildings", async (req, res) => {
  try {
    const buildings = await BldgData.find();
    res.send({ status: "ok", data: buildings });
  } catch (error) {
    console.error(error);
    res.send({ status: "error" });
  }
});

app.delete("/deleteBuilding/:id", async (req, res) => {
  try {
    const buildingId = req.params.id;
    await BldgData.findByIdAndDelete(buildingId); // Use BldgData instead of Building
    res.json({ status: "ok", message: "Building deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error deleting building" });
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});


app.listen(process.env.PORT, process.env.SERVER_HOST, () => {
  console.log(`Server is listening : http://${process.env.SERVER_HOST}:${process.env.PORT}`);
});