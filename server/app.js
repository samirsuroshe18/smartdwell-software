const express = require("express"); // Import express first
const app = express();

const cors = require('cors'); // Import the cors middleware

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Use the apiRouter for API routes

const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");


const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl = "mongodb+srv://sawantasha51:uro76zIVSOX2re7N@cluster0.e9nhtwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  

mongoose
  .connect(mongoUrl, {
  //  useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");


const User = mongoose.model("UserInfo");

app.get("/", async (req, res) => {
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
    const token = jwt.sign({ email: user.email, building: user.building }, JWT_SECRET, {
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
app.use(cors());

app.get('/api/:loc', async (req, res) => {
  try {
    const { loc } = req.params;
    const token = '475e703f-dc25-4e07-9eb7-db86cd19e6c0'; // Authorization token
    const apiUrl = `https://api.nbsense.in/water_ms/get_latest_data?meter_id=${loc}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}` // Include authorization token in headers
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data. Status: ' + response.status);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const responseData = await response.json(); // Parse response as JSON
    console.log('Response:', responseData); // Log the parsed JSON data

    res.json(responseData); // Send the parsed JSON data as response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
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

// API endpoint to add data to bldgdata collection
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


app.listen(8000, () => {
  console.log("Server Started");
});