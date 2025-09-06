// Get references to the form and input elements by their IDs
const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")
const iconPassed = document.getElementById("icon-passed")
const iconFailed = document.getElementById("icon-failed")

// iconPassed.classList.add("hidden")
// iconFailed.classList.add("hidden")

// Function to display an error message for a specific input field
function showError(input, message) {
  // Get the parent element of the input, which is the form-control div
  // const formControl = input.parentElement
  const formControl = input.closest(".form-control");

  // Set the class to 'form-control error' to apply error styles
  formControl.className = "form-control error"
  console.log(formControl)
  // Find the small element within the form-control to display the error message
  const small = formControl.querySelector("small")
  console.log(small)
  // const small = document.getElementById("error-message")
  // Set the error message text
  small.innerText = message
}

// Function to indicate a successful input validation
function showSuccess(input) {
  // Get the parent element of the input, which is the form-control div
  // const formControl = input.parentElement
  const formControl = input.closest(".form-control");

  // Set the class to 'form-control success' to apply success styles
  formControl.className = "form-control success"
  formControl.querySelector(".icon-passed").classList.remove("hidden")
}

// Function to check the inputs and validate them
function checkInputs() {
  // Trim whitespace from the username input value
  const usernameValue = username.value.trim()
  // Check if the username is empty and show error or success accordingly
  if (!usernameValue) {
    showError(username, "Username is required");
  } else {
    showSuccess(username);
  }

  // Trim whitespace from the email input value
  const emailValue = email.value.trim()
  // Check if the email is empty and show error or success accordingly
  if (!emailValue) {
    showError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }

  // Function to validate email format using a regular expression
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Trim whitespace from the password input value
  const passwordValue = password.value.trim()
  // Check if the password is empty and show error or success accordingly
  if (!passwordValue) {
    showError(password, "Password is required");
  } else {
    showSuccess(password);
  }

  // Trim whitespace from the confirm password input value
  const confirmPasswordValue = confirmPassword.value.trim()
  // Check if the confirm password is empty and show error or success accordingly
  if (!confirmPasswordValue) {
    showError(confirmPassword, "Confirm Password is required");
  } else {
    showSuccess(confirmPassword);
    // Check if the password and confirm password match
    if (passwordValue !== confirmPasswordValue) {
      showError(confirmPassword, "Passwords do not match");
    } else {
      showSuccess(confirmPassword);
    }
  }
}

// Add an event listener to the form to handle form submission
form.addEventListener("submit", (e) => {
  // Prevent the default form submission behavior
  e.preventDefault()
  // Log the current values of the input fields to the console
  console.log(username.value, email.value, password.value, confirmPassword.value);
  // Call the function to check and validate inputs
  checkInputs()
})
