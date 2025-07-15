let token = localStorage.getItem("token");

if(!token) window.location.href = "/login";

const profileName = document.querySelector(".fName");
const profileRole = document.querySelector(".role");
const profileIamge = document.querySelector(".profileImg")

let user = JSON.parse(localStorage.getItem("user"));


profileName.textContent = `${user.first_name} ${user.last_name}`;
profileRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
profileIamge.src = user.avatar;