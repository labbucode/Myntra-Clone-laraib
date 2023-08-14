import { TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";


import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase";

function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [errorMsg, setErrorMsg] = useState("")
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    useLayoutEffect(() => {
        const isAuthenticate = localStorage.getItem("isAuthenticate");
        if (isAuthenticate === "true") {
            navigate("/");
        }

        }, [])

    const getUserData = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        setUserData({ ...userData, [name]: value })
        setErrorMsg("")
    }
    const handelSubmit = (e) => {
        e.preventDefault()
        if (!userData.email || !userData.password) {
            setErrorMsg("Please fill in all fields.");
            setTimeout(() => {
                setErrorMsg("")
            }, 5000)
            return;
        }
        else if (!isValidEmail(userData.email)) {
            setErrorMsg("Please enter a valid email address.")
            setTimeout(() => {
                setErrorMsg("")
            }, 5000)
            return;
        }
        else if (userData.password.length < 8) {
            setErrorMsg("Password must be at least 8 characters long.")
            setTimeout(() => {
                setErrorMsg("")
            }, 5000)
            return;
        }

        setSubmitButtonDisabled(true)
        signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then((res) => {
                setSubmitButtonDisabled(false)
                setSuccessMsg("Login successful!")
                setTimeout(() => {
                    navigate("/")
                }, 3000);
                localStorage.setItem("isAuthenticate", true)
            })
            .catch((err) => {
                setSubmitButtonDisabled(false)
                if (err.message === "Firebase: Error (auth/user-not-found).") {
                    setErrorMsg("User not found. Please check your email or sign up for a new account.")
                }
                else if (err.message === "Firebase: Error (auth/wrong-password).") {
                    setErrorMsg("Incorrect password. Please try again.")
                }
                else if (err.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                    setErrorMsg("This account has been temporarily disabled due to many failed login attempts.")
                }
                setTimeout(() => {
                    setErrorMsg("")
                }, 5000)
            })
    }
    return (
        <div className="login-page">
            {successMsg &&
                <Alert style={{}} severity="success">{successMsg}</Alert>
            }
            <h2>Login</h2>
            <form action="">
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={userData.email}
                    required
                    style={{ marginBottom: 20 }}
                    onChange={getUserData}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={userData.password}
                    required
                    onChange={getUserData}
                />
                <div style={{ margin: 10 }}>
                    {errorMsg && <p style={{ margin: 0, color: "red" }}>{errorMsg}</p>}
                </div>

                <button disabled={submitButtonDisabled} type="submit" onClick={handelSubmit}>Login</button>

                <p>Don't have an account? <span onClick={() => navigate("/signup")}>Signup</span></p>
            </form>
        </div>
    )

}

export default Login;