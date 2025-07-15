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

const profileName = document.querySelector(".fName");
const profileRole = document.querySelector(".role");
const profileIamge = document.querySelector(".profileImg")

let user = JSON.parse(localStorage.getItem("user"));


profileName.textContent = `${user.first_name} ${user.last_name}`;
profileRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
profileIamge.src = user.avatar;
