require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const connect = require("./controllers/database-connect");

connect();

const app = express();
app.use(express.json());
app.set("trust proxy", 1); // trust first proxy

app.use(
	cors({
		origin: "http://localhost:3000",
		optionsSuccessStatus: 200,
	})
);

app.get("/", (req, res) => {
	res.send("Hello, world.");
});

app.use("/auth", authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}.`);
});
