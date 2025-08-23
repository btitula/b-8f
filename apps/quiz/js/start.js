const username = document.getElementById("username");

const checkSecretKey = () => {
  const secretKey = localStorage.getItem("secretKey");
  if (secretKey !== "b@tin@quiz@2025") {
    window.location.assign("../index.html");
  }
  username.innerText = `Welcome ${getFullname()}`;
}

const getUsernameFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);  
  return urlParams.get("username");
}

const getFullname = () => {
  const fullName = localStorage.getItem("fullName");
  return fullName;
}

checkSecretKey();
