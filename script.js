document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ระบบปุ่มเมนูบนมือถือ (Mobile Navbar Toggle)
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 2. แอนิเมชันค่อยๆ โผล่ขึ้นมาเวลาเลื่อนจอ (Scroll Reveal Animation)
  const reveals = document.querySelectorAll(".reveal");
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };

  // ตรวจสอบแอนิเมชันทันทีที่โหลดหน้าเสร็จ
  revealOnScroll();
  // ตรวจสอบแอนิเมชันเวลาเลื่อนเมาส์
  window.addEventListener("scroll", revealOnScroll);


  // 3. ระบบตัวกรองหน้า Travel (Destination Filter)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const destinationCards = document.querySelectorAll(".destination-card");

  if (filterBtns.length > 0 && destinationCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // ลบคลาส active จากปุ่มทั้งหมด และเพิ่มให้ปุ่มที่กด
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        // ซ่อนหรือแสดงการ์ดตามภาค (Region)
        destinationCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-region") === filterValue) {
            card.style.display = "block";
            // แอนิเมชันเบาๆ เวลากดกรอง
            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";
            setTimeout(() => { card.style.display = "none"; }, 300);
          }
        });
      });
    });
  }

  // 4. ระบบจำลองการส่งฟอร์ม หน้า Contact (Form Validation)
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.querySelector(".form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // ป้องกันไม่ให้รีเฟรชหน้า
      
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      let isValid = true;

      // ตรวจสอบแบบง่ายๆ
      if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        isValid = false;
        formStatus.style.color = "#ff6b6b";
        formStatus.textContent = "Please fill in all fields.";
      }

      if (isValid) {
        formStatus.style.color = "#4cd137";
        formStatus.textContent = "Message sent successfully! (Simulated)";
        contactForm.reset(); // ล้างฟอร์ม
      }
    });
  }

});