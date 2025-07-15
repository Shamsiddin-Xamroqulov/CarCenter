document.addEventListener('DOMContentLoaded', () => {
  // Top navbarda profil dropdown menyusi uchun
  const profileBtn = document.getElementById('profileBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const arrowIcon = document.getElementById('arrowIcon');

  profileBtn.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
      arrowIcon.classList.toggle('rotate-180');
  });

  // Dropdown menyusidan tashqariga bosilganda yopish
  document.addEventListener('click', (event) => {
      if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.classList.add('hidden');
          arrowIcon.classList.remove('rotate-180');
      }
  });

  // Profil sahifasidagi tahrirlash funksiyasi uchun
  const editButton = document.querySelector('button:has(.ri-edit-line)');
  const saveButton = document.querySelector('button:has(.ri-save-line)');
  const uploadProfilePicButton = document.querySelector('button:has(.ri-upload-2-line)');
  const cameraButton = document.querySelector('button:has(.ri-camera-line)');
  const profileImage = document.querySelector('.w-32.h-32 img');

  // Barcha ma'lumot bloklari
  const profileFields = document.querySelectorAll('.grid.grid-cols-1 > div.bg-gray-50, .mt-8.bg-gray-50.rounded-lg.p-6');
  let isEditing = false; // Tahrirlash holatini kuzatish

  // Sahifa yuklanganda "Saqlash" tugmasini yashirish
  if (saveButton) {
      saveButton.classList.add('hidden');
  }

  editButton.addEventListener('click', function () {
      if (!isEditing) {
          enableEditing();
          this.innerHTML = `
              <div class="w-4 h-4 flex items-center justify-center">
                  <i class="ri-close-line text-sm"></i>
              </div>
              Bekor qilish
          `;
          if (saveButton) {
              saveButton.classList.remove('hidden');
          }
          isEditing = true;
      } else {
          // Bekor qilish holati
          disableEditing(true); // Original qiymatlarga qaytarish
          this.innerHTML = `
              <div class="w-4 h-4 flex items-center justify-center">
                  <i class="ri-edit-line text-sm"></i>
              </div>
              Tahrirlash
          `;
          if (saveButton) {
              saveButton.classList.add('hidden');
          }
          isEditing = false;
      }
  });

  function enableEditing() {
      profileFields.forEach(field => {
          const pElement = field.querySelector('p');
          const label = field.querySelector('label'); // Ma'lumot turini aniqlash uchun label
          
          if (pElement) {
              const currentText = pElement.textContent.trim();
              let inputElement;

              // Input turini labelga qarab aniqlash
              if (label && label.textContent.includes('Email')) {
                  inputElement = document.createElement('input');
                  inputElement.type = 'email';
              } else if (label && label.textContent.includes('Telefon')) {
                  inputElement = document.createElement('input');
                  inputElement.type = 'tel';
              } else if (label && (label.textContent.includes('sana') || label.textContent.includes("o'tgan sana"))) {
                  inputElement = document.createElement('input');
                  inputElement.type = 'date';
                  // Sanani inputga mos formatga o'tkazish
                  inputElement.value = formatDateForInput(currentText);
              } else if (field.querySelector('h3') && field.querySelector('h3').textContent.includes("Qo'shimcha ma'lumotlar")) {
                  // Qo'shimcha ma'lumotlar uchun textarea
                  inputElement = document.createElement('textarea');
                  inputElement.style.minHeight = '96px'; // H-24 ga mos keladi
                  inputElement.style.resize = 'vertical';
              } else {
                  inputElement = document.createElement('input');
                  inputElement.type = 'text';
              }
              
              inputElement.value = inputElement.type === 'date' ? formatDateForInput(currentText) : currentText;
              inputElement.className = 'w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary';
              inputElement.dataset.originalValue = currentText; // Bekor qilish uchun asl qiymatni saqlash

              pElement.replaceWith(inputElement);
          }
      });
  }

  // `revert` parametr agar true bo'lsa, original qiymatlarga qaytaradi
  function disableEditing(revert = false) {
      profileFields.forEach(field => {
          const inputElement = field.querySelector('input') || field.querySelector('textarea');
          
          if (inputElement) {
              const newP = document.createElement('p');
              newP.className = field.classList.contains('mt-8') ? 'text-gray-600 leading-relaxed' : 'text-gray-800 font-medium';
              
              let displayValue = revert ? inputElement.dataset.originalValue : inputElement.value;

              // Sanani ko'rsatish formatiga qaytarish
              if (inputElement.type === 'date') {
                  displayValue = formatDisplayDate(displayValue);
              }

              newP.textContent = displayValue;
              inputElement.replaceWith(newP);
          }
      });
  }

  if (saveButton) {
      saveButton.addEventListener('click', function () {
          if (isEditing) {
              // Ma'lumotlarni yig'ish (bu qismni serverga yuborish uchun o'zingiz o'zgartirishingiz kerak)
              const updatedData = {};
              profileFields.forEach(field => {
                  const inputElement = field.querySelector('input') || field.querySelector('textarea');
                  if (inputElement) {
                      const label = field.querySelector('label');
                      const fieldName = label ? label.textContent.trim() : (field.querySelector('h3') ? field.querySelector('h3').textContent.trim() : '');
                      let value = inputElement.value;

                      switch (fieldName) {
                          case "To'liq ismi": updatedData.fullName = value; break;
                          case "Foydalanuvchi nomi": updatedData.username = value; break;
                          case "Email manzili": updatedData.email = value; break;
                          case "Telefon raqami": updatedData.phone = value; break;
                          case "Manzili": updatedData.address = value; break;
                          case "Ro'yxatdan o'tgan sana": updatedData.registrationDate = value; break;
                          case "Kasbi": updatedData.profession = value; break;
                          case "Tug'ilgan sana": updatedData.dob = value; break;
                          case "Qo'shimcha ma'lumotlar": updatedData.additionalInfo = value; break;
                      }
                  }
              });
              console.log("Updated Data:", updatedData);
              // Bu yerda updatedData ni serverga yuborish uchun Fetch API yoki XMLHttpRequest ishlatilishi mumkin.

              disableEditing(false); // Yangi qiymatlar bilan ko'rsatish
              editButton.innerHTML = `
                  <div class="w-4 h-4 flex items-center justify-center">
                      <i class="ri-edit-line text-sm"></i>
                  </div>
                  Tahrirlash
              `;
              this.classList.add('hidden'); // "Saqlash" tugmasini yashirish
              isEditing = false;

              const notification = document.createElement("div");
              notification.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
              notification.textContent = "Ma'lumotlar muvaffaqiyatli saqlandi!";
              document.body.appendChild(notification);

              setTimeout(() => {
                  notification.remove();
              }, 3000);
          }
      });
  }

  // Profil rasmini yuklash
  if (uploadProfilePicButton) {
      uploadProfilePicButton.addEventListener("click", function () {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = function (e) {
              const file = e.target.files[0];
              if (file) {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                      if (profileImage) {
                          profileImage.src = e.target.result;
                      }
                  };
                  reader.readAsDataURL(file);
              }
          };
          input.click();
      });
  }

  // Kamera tugmasi ham rasm yuklashni chaqiradi
  if (cameraButton) {
      cameraButton.addEventListener("click", function () {
          if (uploadProfilePicButton) {
              uploadProfilePicButton.click();
          }
      });
  }

  // Yordamchi funksiyalar sanani input formatiga o'tkazish uchun (YYYY-MM-DD)
  function formatDateForInput(dateString) {
      const parts = dateString.split(' '); // "15 Mart 2023" -> ["15", "Mart", "2023"]
      if (parts.length < 3) return dateString;

      const day = parts[0];
      const year = parts[2];
      const monthNames = {
          "Yanvar": "01", "Fevral": "02", "Mart": "03", "Aprel": "04", "May": "05", "Iyun": "06",
          "Iyul": "07", "Avgust": "08", "Sentabr": "09", "Oktyabr": "10", "Noyabr": "11", "Dekabr": "12"
      };
      const month = monthNames[parts[1]];

      if (day && month && year) {
          return `${year}-${month}-${day.padStart(2, '0')}`;
      }
      return dateString;
  }

  // Yordamchi funksiya input sanasini display formatiga o'tkazish uchun ("DD Month YYYY")
  function formatDisplayDate(dateInput) {
      if (!dateInput) return '';
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return dateInput; // Invalid date

      // O'zbekcha oy nomlari uchun toLocaleDateString ishlatamiz
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('uz-UZ', options);
  }
});

let token = localStorage.getItem("token");

if(!token) window.location.href = "/login";

const profileName = document.querySelector(".fName");
const profileRole = document.querySelector(".role");
const profileIamge = document.querySelector(".profileImg")

let user = JSON.parse(localStorage.getItem("user"));


profileName.textContent = `${user.first_name} ${user.last_name}`;
profileRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
profileIamge.src = user.avatar;


const avatarImg = document.querySelector(".avatar");
const fullNameInp = document.querySelector(".fullName");
const firstNameInp = document.querySelector(".firstName");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const password = document.querySelector(".password");
const address = document.querySelector(".address");

avatarImg.src = user.avatar;
fullNameInp.textContent = user.last_name;
firstNameInp.textContent = user.first_name;
email.textContent = user.email;
phone.textContent = user.phone;
password.textContent = user.password;
address.textContent = `${user.region}, ${user.city}, ${user.street}, ${user.description},`;