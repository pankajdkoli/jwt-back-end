const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "my-32-character-ultra-secure-and-ultra-long-secret"; //secret key means singnature

const JWT_EXPIRES_IN = 300;

// Registration endpoint
router.post(
  "/signup",
  [
    check("firstname")
      .isLength({ min: 5 })
      .withMessage("First name must be at least 5 characters"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 5 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,}$/)
      .withMessage(
        "Password must be at least 5 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstname, lastname, mobilenumber, email, password } = req.body;

      // Check if the email already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create a new user
      const user = new User({
        firstname,
        lastname,
        mobilenumber,
        email,
        password,
      });
      await user.save();

      // Generate token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      res.status(201).json({ message: "Registration successful", token });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  }
);

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Profile endpoint (requires authentication)
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ");

    if (!token[1]) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token[1], JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const { userId } = decoded;

      // Fetch user data
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
