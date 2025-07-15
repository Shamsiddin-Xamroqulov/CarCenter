let token = localStorage.getItem("token");

if(token) window.location.href = "/index";


const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const togglePasswordIcon = togglePasswordBtn.querySelector("i");

togglePasswordBtn.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePasswordIcon.className = type === "password" ? "ri-eye-off-line text-gray-400 text-sm" : "ri-eye-line text-gray-400 text-sm";
});

// === PAROL KUCHINI BAHOLASH ===
const passwordStrengthBar = document.getElementById("passwordStrength");
const strengthText = document.getElementById("strengthText");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  const strength = calculateStrength(value);
  updateStrengthDisplay(strength);
});

function calculateStrength(password) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

function updateStrengthDisplay(strength) {
  let width = "0%";
  let color = "bg-red-400";
  let label = "Zaif";

  if (strength === 1) {
    width = "25%";
    color = "bg-red-400";
    label = "Zaif";
  } else if (strength === 2) {
    width = "50%";
    color = "bg-yellow-400";
    label = "O'rtacha";
  } else if (strength === 3) {
    width = "75%";
    color = "bg-blue-400";
    label = "Yaxshi";
  } else if (strength === 4) {
    width = "100%";
    color = "bg-green-500";
    label = "Kuchli";
  }

  passwordStrengthBar.style.width = width;
  passwordStrengthBar.className = `h-2 rounded-full transition-all duration-300 ${color}`;
  strengthText.textContent = label;
}

// === VILOYAT DROPDOWN ===
const regionBtn = document.getElementById("regionSelect");
const regionDropdown = document.getElementById("regionDropdown");
const regionText = document.getElementById("regionText");

regionBtn.addEventListener("click", () => {
  regionDropdown.classList.toggle("hidden");
});

regionDropdown.querySelectorAll("[data-value]").forEach(item => {
  item.addEventListener("click", () => {
    const value = item.dataset.value;
    const label = item.textContent;
    regionText.textContent = label;
    regionText.classList.remove("text-gray-500");
    regionText.classList.add("text-gray-900");
    regionDropdown.classList.add("hidden");
  });
});

// === SHAHAR DROPDOWN ===
const cityBtn = document.getElementById("citySelect");
const cityDropdown = document.getElementById("cityDropdown");
const cityText = document.getElementById("cityText");

cityBtn.addEventListener("click", () => {
  cityDropdown.classList.toggle("hidden");
});

cityDropdown.querySelectorAll("[data-value]").forEach(item => {
  item.addEventListener("click", () => {
    const value = item.dataset.value;
    const label = item.textContent;
    cityText.textContent = label;
    cityText.classList.remove("text-gray-500");
    cityText.classList.add("text-gray-900");
    cityDropdown.classList.add("hidden");
  });
});

// === CHECKBOX KO'RINISHI UCHUN ===
const checkbox = document.getElementById("terms");
const customCheckbox = document.getElementById("customCheckbox");
const checkIcon = document.getElementById("checkIcon");

customCheckbox.addEventListener("click", () => {
  checkbox.checked = !checkbox.checked;
  checkIcon.classList.toggle("hidden", !checkbox.checked);
  customCheckbox.classList.toggle("bg-primary", checkbox.checked);
  customCheckbox.classList.toggle("border-primary", checkbox.checked);
});

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const first_name = document.getElementById("first_name")?.value.trim();
  const last_name = document.getElementById("last_name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const password = document.getElementById("password")?.value;

  const region = document.getElementById("regionText")?.textContent.trim();
  const city = document.getElementById("cityText")?.textContent.trim();
  const street = document.getElementById("street")?.value.trim();
  const description = document.getElementById("description")?.value.trim();
  const avatarFile = document.getElementById("avatar")?.files[0];

  const checkbox = document.getElementById("terms")?.checked;

  // Validation
  if (
    !first_name || !last_name || !email || !phone || !password ||
    region === "Viloyatni tanlang" || city === "Shaharni tanlang" ||
    !street || !checkbox || !avatarFile
  ) {
  alert("Please complete all required fields and accept the terms.");

  }

  const formData = new FormData();
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("password", password);
  formData.append("region", region);
  formData.append("city", city);
  formData.append("street", street);
  formData.append("description", description);
  formData.append("avatar", avatarFile);

  try {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Registration successful!");
      if(data.user.role == "user") window.location.href = "/clientIndex";
    } else {
      alert(data.message || data.errors?.join("\n") || "Registration failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to connect to the server.");
  }
});

const avatarInput = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");

avatarInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});