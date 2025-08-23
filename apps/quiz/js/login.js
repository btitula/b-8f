const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const users = [
  {
    username: "tuk",
    password: "tuktuk@2025",
    fullname: "Chan Mike Hy"
  },
  {
    username: "tin",
    password: "tintin@2025",
    fullname: "Chan Mike Khang"
  },
]

const toggleButtons = (isDisabled) => {
  loginBtn.disabled = isDisabled;
};

username.addEventListener("keyup", () => {
  toggleButtons(username.value === "");
});

const checkLoginWithFixCredentials = (username, password) => {
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return {
      success: true,
      fullname: user.fullname
    };
  } else {
    return {
      success: false,
      fullname: null
    };
  }
}

const showAlert = (message, duration = 3000) => {
  // Create alert element
  const alertBox = document.createElement("div");
  alertBox.className = "custom-alert";
  alertBox.textContent = message;

  // Append to body
  document.body.appendChild(alertBox);

  // Trigger animation
  setTimeout(() => alertBox.classList.add("show"), 10);

  // Auto-remove after duration
  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => alertBox.remove(), 300);
  }, duration);
}

loginQuiz = (e) => {
  e.preventDefault();
  checkAlreadyLogin();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = checkLoginWithFixCredentials(username, password);
  if (user.success) {
    localStorage.setItem("secretKey", "b@tin@quiz@2025");
    localStorage.setItem("fullName", user.fullname);
    // window.location.assign(`../quiz/pages/start.html?username=${encodeURIComponent(user.fullname)}`);
    window.location.assign(`../quiz/pages/start.html`);
  } else {
    showAlert("Invalid Username or Password");
  }
}
