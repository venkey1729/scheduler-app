const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, Mentor, Student } = require('../models');

exports.register = async (req, res) => {
  const { username, email, password, role, areaOfInterest, availability } = req.body;
  console.log("Received availability in backend:", availability);
  
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword); 
      const user = await User.create({ username, email, password: hashedPassword, role });

      if (role === 'mentor') {
          await Mentor.create({
              userId: user.id,
              areaOfInterest,
              availability: availability ? JSON.parse(availability) : null 
          });
      } else if (role === 'student') {
          await Student.create({ userId: user.id });
      }

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error('User not found for email:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
