function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "1234") {
      window.location.href = "messages.html";
    } else {
      alert("Invalid credentials!");
    }
  }
  