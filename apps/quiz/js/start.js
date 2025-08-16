const username = document.getElementById("username");

const checkSecretKey = () => {
  const secretKey = localStorage.getItem("secretKey");
  if (secretKey !== "b@tin@quiz@2025") {
    window.location.assign("../index.html");
  }
  username.innerText = `Welcome ${getUsernameFromUrl()}`;
}

const getUsernameFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);  
  return urlParams.get("username");
}

checkSecretKey();
