console.log("index.js");

const checkAlreadyLogin = () => {
  const secretKey = localStorage.getItem("secretKey");
  console.log(secretKey);

  if (secretKey === "b@tin@quiz@2025") {
    window.location.assign(`../quiz/pages/start.html`);
  }
}

checkAlreadyLogin();