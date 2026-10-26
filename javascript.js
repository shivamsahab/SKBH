const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Database (temporary storage)
let trialBookings = [];
let roomEnquiries = [];

// API: Handle Trial Stay Booking
app.post('/api/book-trial', (req, res) => {
    const booking = { id: Date.now(), ...req.body, createdAt: new Date() };
    trialBookings.push(booking);
    console.log('New Trial Booking Received:', booking);
    res.json({ success: true, message: 'Trial booking successfully saved!', booking });
});

// API: Handle Room Enquiry
app.post('/api/enquire', (req, res) => {
    const enquiry = { id: Date.now(), ...req.body, createdAt: new Date() };
    roomEnquiries.push(enquiry);
    console.log('New Room Enquiry Received:', enquiry);
    res.json({ success: true, message: 'Enquiry received successfully!', enquiry });
});

// Admin API
app.get('/api/admin/data', (req, res) => {
    res.json({ trialBookings, roomEnquiries });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// 5. Booking Form Handling (WhatsApp Redirect)
  const trialBookingForm = document.getElementById("trialBookingForm");

  if (trialBookingForm) {
    trialBookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Form Data Collect Karein
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const stayDuration = document.getElementById("stayDuration").value;
      const arrivalDate = document.getElementById("arrivalDate").value;
      const roomPreference = document.getElementById("roomPreference").value;
      const message = document.getElementById("message").value.trim();

      // WhatsApp Message Formatting
      const whatsappNumber = "919876543210"; // <-- Yahan apna 10-digit WhatsApp number dalein

      let text = `*New Trial Stay Booking Request*%0A%0A`;
      text += `👤 *Name:* ${fullName}%0A`;
      text += `📞 *Phone:* ${phone}%0A`;
      text += `⏱️ *Stay Duration:* ${stayDuration}%0A`;
      text += `📅 *Arrival Date:* ${arrivalDate}%0A`;
      text += `🛏️ *Room Preference:* ${roomPreference}%0A`;
      if (message) {
        text += `💬 *Message:* ${message}%0A`;
      }

      // WhatsApp URL Open Karein
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;
      window.open(whatsappURL, "_blank");

      // Form Reset aur Response Message
      const formResponseMessage = document.getElementById("formResponseMessage");
      if (formResponseMessage) {
        formResponseMessage.style.color = "#28a745";
        formResponseMessage.textContent = "🎉 Redirecting to WhatsApp to send your booking request...";
      }

      trialBookingForm.reset();
    });
  }