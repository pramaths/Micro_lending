import React, { useState } from 'react';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged ,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../utils/login.css'

const Signup=()=> {
  const [error, setError] = useState(""); // Define the 'error' state variable
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message); // Set the error state variable with the error message
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        setError(err.message);
    }
};

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/kyc");
  });
return (
    <section> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    <div className="signin">
      <div className="content">
        <img src="/icon.png" alt="Logo" className="logo" style={{ width: '100px', height: 'auto' }}  />
        <h2>Register</h2>
        <div className="form">
          <div className="inputBox">
          <input 
           type="text" 
           placeholder="Name" 
           name="full_name" 
           value={formValues.full_name} 
           onChange={(e)=>
           setFormValues({...formValues,[e.target.name]:e.target.value})
           }
           />
          </div>
          <div className="inputBox">
          <input 
           type="email" 
           placeholder="Email Address" 
           name="email" 
           value={formValues.email} 
           onChange={(e)=>
           setFormValues({...formValues,[e.target.name]:e.target.value})
           }
           />
          </div>
          <div className="inputBox">
          <input type="password" placeholder="Password" name="password" 
           value={formValues.password} 
           onChange={(e)=>
           setFormValues({...formValues,[e.target.name]:e.target.value})
           }
           />
          </div>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        <div className="inputBox">
        <button  className="inputBox color" onClick={handleSignIn}>Sign Up</button>
        </div>

        <div className="or">OR</div>
        <div className="inputBox">
            <button className="inputBox color" onClick={handleGoogleLogin}>Register with Google</button>
        </div>
      </div>
    </div>
    </section>
)
}

export default Signup;