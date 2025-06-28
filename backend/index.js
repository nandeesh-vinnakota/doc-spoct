const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./config/connectToDB");

const app = express();
//////dotenv config/////////////////////
dotenv.config();
connectToDB();
const PORT = process.env.PORT || 3000;

/////////////////middlewares////////////////
app.use(express.json());
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend", "build")));

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).send({ message: "API Server is running", success: true });
});

// API routes
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/admin/', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

// For any other routes, serve the frontend index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
