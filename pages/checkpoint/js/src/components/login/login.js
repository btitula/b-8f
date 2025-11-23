import loginHtml from "./login.html?raw";
const Login = async () => {
  const templateFunction = new Function(
    `return \`${loginHtml}\`;`
  );

  return templateFunction();
}

export default Login;
