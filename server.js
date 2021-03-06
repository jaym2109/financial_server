const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/financials", require("./routes/api/financials"));
app.use("/api/accounts", require("./routes/api/accounts"));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
