import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <LoginForm></LoginForm>
    </div>
  );
}

const LoginForm = () => {
  //State shiz
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (usernameError.length > 0 || passwordError.length > 0) validateFields();
  }, [username, password]);

  // Post stuff here
  const handleSubmit = () => {
    if (!validateFields()) return;

    fetch("https://api.com", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    });

    console.log("Info POSTED");
  };

  const validateFields = () => {
    setUsernameError("");
    setPasswordError("");
    var error = false;
    if (username.length == 0) {
      setUsernameError("Username cannot be empty");
      error = true;
    }

    if (password.length == 0) {
      setPasswordError("Password cannot be empty");
      error = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be atleast 6 characters");
      error = true;
    }

    return !error;
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <div>Login Form</div>
      <Input
        type="text"
        placeholder="Username"
        setInput={setUsername}
        value={username}
      ></Input>
      {usernameError ? <div className="error">{usernameError}</div> : ""}
      <Input
        type="password"
        placeholder="Password"
        setInput={setPassword}
        value={password}
      ></Input>
      {passwordError ? <div className="error">{passwordError}</div> : ""}
      <Button
        label="Submit"
        onClick={handleSubmit}
        password={password}
      ></Button>
      <Button label="Clear" onClick={clearForm}></Button>
    </div>
  );
};

const Input = ({ type, placeholder, setInput, value }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        value={value}
      ></input>
    </div>
  );
};

const Button = ({ label, ...rest }) => {
  return (
    <div>
      <button {...rest}>{label}</button>
    </div>
  );
};

export default App;
