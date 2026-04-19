import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Task Manager App</h1>

      {loggedIn ? (
        <Dashboard />
      ) : showSignup ? (
        <>
          <Signup />
          <p>
            Already have account?{" "}
            <button onClick={() => setShowSignup(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login setLoggedIn={setLoggedIn} />
          <p>
            New user?{" "}
            <button onClick={() => setShowSignup(true)}>Signup</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;