const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const arrowIcon = document.getElementById("arrowIcon");

let token = localStorage.getItem("token");

if(!token) window.location.href = "/login";

profileBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
  arrowIcon.classList.toggle("rotate-180");
});

// Dropdowndan tashqariga bosilganda yopish uchun
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add("hidden");
    arrowIcon.classList.remove("rotate-180");
  }
});

function viewDetails(button) {
  const card = button.closest("[data-car]");

  const data = {
    title: card.querySelector("[data-title]").innerText,
    year: card.querySelector("[data-year]").innerText,
    image: card.querySelector("[data-image]").src,
    type: card.querySelector("[data-type]").innerText,
    power: card.querySelector("[data-power]").innerText,
    range: card.querySelector("[data-range]").innerText,
    acceleration: card.querySelector("[data-acceleration]").innerText,
    speed: card.querySelector("[data-speed]").innerText,
  };

  localStorage.setItem("selectedCar", JSON.stringify(data));
}

const addCarBtn = document.getElementById("addCarBtn");
  const addCarModal = document.getElementById("addCarModal");
  const closeModal = document.getElementById("closeModal");
  const brandSelect = document.getElementById("brandSelect");

  addCarBtn.addEventListener("click", async () => {
    addCarModal.classList.remove("hidden");
    addCarModal.classList.add("flex");
  });

  closeModal.addEventListener("click", () => {
    addCarModal.classList.add("hidden");
    addCarModal.classList.remove("flex");
  });

  addCarModal.addEventListener("click", (e) => {
    if (e.target === addCarModal) {
      addCarModal.classList.add("hidden");
      addCarModal.classList.remove("flex");
    }
  });

  const profileName = document.querySelector(".fName");
  const profileRole = document.querySelector(".role");
  const profileIamge = document.querySelector(".profileImg")
  
  let user = JSON.parse(localStorage.getItem("user"));
  
  
  profileName.textContent = `${user.first_name} ${user.last_name}`;
  profileRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
  profileIamge.src = user.avatar;