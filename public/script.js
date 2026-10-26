document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Active Nav Link Handling (Fixes double active underline issue)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 2. Hero Carousel
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      if (dots[i]) dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto slide every 5 seconds
  slideInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => clearInterval(slideInterval));
    heroSection.addEventListener("mouseleave", () => slideInterval = setInterval(nextSlide, 5000));
  }

  // 3. Mess Menu Data & Switcher
  const weeklyMenus = {
    monday: {
      title: "Monday Menu",
      items: [
        { type: "Breakfast", desc: "Aloo Paratha with Butter, Curd, Boiled Sprouts & Hot Tea" },
        { type: "Lunch", desc: "Tawa Roti, Jeera Rice, Yellow Dal Tadka, Paneer Butter Masala, Salad & Chaas" },
        { type: "Evening Snacks", desc: "Veg Sandwich with Tea / Coffee" },
        { type: "Dinner", desc: "Phulkka Roti, Mix Veg Curry, Dal Makhani, Rice & Gulab Jamun (Sweet)" }
      ]
    },
    tuesday: {
      title: "Tuesday Menu",
      items: [
        { type: "Breakfast", desc: "Poha with Sev, Boiled Eggs / Banana, Milk & Tea" },
        { type: "Lunch", desc: "Tawa Roti, Plain Rice, Dal Fry, Chana Masala, Salad & Raita" },
        { type: "Evening Snacks", desc: "Samosa / Biscuit with Tea" },
        { type: "Dinner", desc: "Phulkka Roti, Aloo Jeera, Dal Palak, Rice & Kheer" }
      ]
    },
    wednesday: {
      title: "Wednesday Menu",
      items: [
        { type: "Breakfast", desc: "Paneer Sandwich, Sprouted Moong, Seasonal Fruit & Tea" },
        { type: "Lunch", desc: "Tawa Roti, Jeera Rice, Dal Makhani, Seasonal Veg, Salad & Buttermilk" },
        { type: "Evening Snacks", desc: "Maggi / Bread Toast with Tea" },
        { type: "Dinner", desc: "Phulkka Roti, Malai Kofta, Yellow Dal, Rice & Ice Cream" }
      ]
    },
    thursday: {
      title: "Thursday Menu",
      items: [
        { type: "Breakfast", desc: "Idli Sambar or Upma with Coconut Chutney & Tea" },
        { type: "Lunch", desc: "Tawa Roti, Rice, Dal Fry, Rajma Masala, Salad & Curd" },
        { type: "Evening Snacks", desc: "Roasted Makhana with Tea" },
        { type: "Dinner", desc: "Phulkka Roti, Shahi Paneer, Dal Tadka, Rice & Rasgulla" }
      ]
    },
    friday: {
      title: "Friday Menu",
      items: [
        { type: "Breakfast", desc: "Stuffed Gobhi Paratha with Butter, Curd & Tea" },
        { type: "Lunch", desc: "Tawa Roti, Fried Rice, Dal Makhani, Mix Veg, Salad & Raita" },
        { type: "Evening Snacks", desc: "French Fries / Biscuits with Tea" },
        { type: "Dinner", desc: "Phulkka Roti, Dum Aloo, Dal Fry, Rice & Fruit Custard" }
      ]
    },
    saturday: {
      title: "Saturday Menu",
      items: [
        { type: "Breakfast", desc: "Bread Omelette / Sprouts Salad, Banana & Tea" },
        { type: "Lunch", desc: "Tawa Roti, Jeera Rice, Dal Panchmel, Chole Masala, Salad & Salad" },
        { type: "Evening Snacks", desc: "Pav Bhaji with Tea" },
        { type: "Dinner", desc: "Phulkka Roti, Special Paneer Bhurji, Dal Makhani, Rice & Moong Dal Halwa" }
      ]
    },
    sunday: {
      title: "Sunday Menu",
      items: [
        { type: "Breakfast", desc: "Chole Bhature with Sweet Lassi & Fresh Fruits" },
        { type: "Lunch", desc: "Special Veg Biryani with Paneer Gravy, Raita & Papad" },
        { type: "Evening Snacks", desc: "Cake Slice with Coffee / Tea" },
        { type: "Dinner", desc: "Phulkka Roti, Kaju Curry, Dal Makhani, Pulao & Special Dessert" }
      ]
    }
  };

  const dayButtons = document.querySelectorAll(".day-btn");
  const menuDayTitle = document.getElementById("menuDayTitle");
  const menuItemsList = document.getElementById("menuItemsList");

  dayButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      dayButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const day = btn.getAttribute("data-day");
      const dayData = weeklyMenus[day];

      if (dayData) {
        menuDayTitle.textContent = dayData.title;
        menuItemsList.innerHTML = dayData.items.map(item => `
          <div class="menu-item-row">
            <span class="meal-type">${item.type}</span>
            <span class="meal-desc">${item.desc}</span>
          </div>
        `).join("");
      }
    });
  });

  // 4. Room quick book pre-select
  const bookRoomBtns = document.querySelectorAll(".book-room-btn");
  const roomPreferenceSelect = document.getElementById("roomPreference");

  bookRoomBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const roomName = btn.getAttribute("data-room");
      if (roomPreferenceSelect) {
        for (let option of roomPreferenceSelect.options) {
          if (roomName.includes(option.text.split(" ")[1])) {
            option.selected = true;
            break;
          }
        }
      }
    });
  });

  // 5. Booking Form Handling (Server API Call)
  const trialBookingForm = document.getElementById("trialBookingForm");
  const formResponseMessage = document.getElementById("formResponseMessage");

  if (trialBookingForm) {
    trialBookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";

      const formData = {
        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        stayDuration: document.getElementById("stayDuration").value,
        arrivalDate: document.getElementById("arrivalDate").value,
        roomPreference: document.getElementById("roomPreference").value,
        message: document.getElementById("message").value
      };

      try {
        const response = await fetch('/api/book-trial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          formResponseMessage.style.color = "#28a745";
          formResponseMessage.textContent = "🎉 Booking request received! Our admission counselor will call you within 30 minutes.";
          trialBookingForm.reset();
        } else {
          formResponseMessage.style.color = "#dc3545";
          formResponseMessage.textContent = "Something went wrong. Please try again.";
        }
      } catch (error) {
        formResponseMessage.style.color = "#dc3545";
        formResponseMessage.textContent = "Server error. Please contact directly on phone.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Trial Stay Now";

        setTimeout(() => {
          formResponseMessage.textContent = "";
        }, 6000);
      }
    });
  }
});


// 5. Booking Form Handling (Direct to WhatsApp)
  const trialBookingForm = document.getElementById("trialBookingForm");

  if (trialBookingForm) {
    trialBookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Form se saari details nikalna
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const stayDuration = document.getElementById("stayDuration").value;
      const arrivalDate = document.getElementById("arrivalDate").value;
      const roomPreference = document.getElementById("roomPreference").value;
      const message = document.getElementById("message").value.trim();

      // Yahan apna WhatsApp number dalein (Country code ke sath, jaise 919877924332)
      const whatsappNumber = "917004313014"; 

      // WhatsApp message ka format
      let text = `*New Trial Stay Booking Request*%0A%0A`;
      text += `👤 *Name:* ${fullName}%0A`;
      text += `📞 *Phone:* ${phone}%0A`;
      text += `⏱️ *Stay Duration:* ${stayDuration}%0A`;
      text += `📅 *Arrival Date:* ${arrivalDate}%0A`;
      text += `🛏️ *Room Preference:* ${roomPreference}%0A`;
      if (message) {
        text += `💬 *Message:* ${message}%0A`;
      }

      // WhatsApp open karna
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;
      window.open(whatsappURL, "_blank");

      // Form reset
      const formResponseMessage = document.getElementById("formResponseMessage");
      if (formResponseMessage) {
        formResponseMessage.style.color = "#28a745";
        formResponseMessage.textContent = "🎉 Redirecting to WhatsApp to send your booking request...";
      }

      trialBookingForm.reset();
    });
  }