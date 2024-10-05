require('dotenv').config();
const express = require('express');
const connectDB = require('./connectDB');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
	  origin: ["http://localhost:5173"]
	})
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
	connectDB();
});

app.get('/', (req, res) => {
    res.send('this is root');
});

// account routes
const account = require('./routes/account');
app.use("/account", account);

// authentication & authorization routes
const auth = require('./routes/auth');
app.use("/auth", auth);

