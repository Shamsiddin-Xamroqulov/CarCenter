let token = localStorage.getItem("token");

if(token) window.location.href = "/index";

document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
  
    // Validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    const user = { email, password };
  
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "/index"; // or wherever you redirect
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server.");
    }
  });