// Backend - Authentication Routes (userController.js)
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User doesn't exist" 
      });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ 
        success: true, 
        token,
        user: {
          name: user.name,
          email: user.email,
          id: user._id
        }
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error, please try again" 
    });
  }
};

// Route for sign up
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Checking existing user
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists" 
      });
    }
    
    // Validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Please enter a valid email" 
      });
    }
    
    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 8 characters long" 
      });
    }
    
    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    })) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      });
    }
    
    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });
    
    const user = await newUser.save();
    
    const token = createToken(user._id);
    
    res.status(201).json({ 
      success: true, 
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error, please try again" 
    });
  }
};

// Route for admin login - Improved security
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Rate limiting should be implemented at the middleware level
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Admin token should include a role and have a shorter expiry
      const token = jwt.sign(
        { role: 'admin', email },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
      );
      
      res.json({
        success: true, 
        token,
        role: 'admin'
      });
    } else {
      // Use the same error message as normal login for security
      res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error, please try again" 
    });
  }
};

export { loginUser, registerUser, adminLogin };