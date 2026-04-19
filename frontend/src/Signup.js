import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password
    });

    alert("User created! Now login.");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;