const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from 'public' and root directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// Homepage Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Booking API Endpoint
app.post('/api/book-trial', (req, res) => {
  const { fullName, phone, stayDuration, arrivalDate, roomPreference, message } = req.body;
  
  console.log("New Booking Received:", req.body);
  
  // Yahan aap database me save kar sakte hain ya email bhej sakte hain

  res.status(200).json({ 
    success: true, 
    message: "Booking request received successfully!" 
  });
});
