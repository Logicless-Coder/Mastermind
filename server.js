require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
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
app.use("/game", gameRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server up and running on port ${port}.`);
});
