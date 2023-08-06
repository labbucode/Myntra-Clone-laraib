import { TextField } from "@mui/material";
import { Alert } from "@mui/material"
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "./firebase";

function Signup() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
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
        if (!userData.name || !userData.email || !userData.password) {
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

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((res) => {
                const userRes = res.user;
                updateProfile(userRes, {
                    displayName: userData.name
                })
                setTimeout(() => {
                    navigate("/")
                    window.location.reload()
                }, 3000);
                setSubmitButtonDisabled(false);
                setSuccessMsg("Signup successful!");
                localStorage.setItem("isAuthenticate", true);
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                    setErrorMsg("This email is already registered. Please use a different email or login.")
                }
                console.log(err.message);
                setTimeout(() => {
                    setErrorMsg("")
                }, 4000)
            })
    }
    return (
        <div className="login-page">
            {successMsg &&
                <Alert style={{}} severity="success">{successMsg}</Alert>
            }
            <h2>Signup</h2>
            <form action="">
                <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    required
                    style={{ marginBottom: 20 }}
                    value={userData.name}
                    onChange={getUserData}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    required
                    style={{ marginBottom: 20 }}
                    value={userData.email}
                    onChange={getUserData}
                />
                <TextField
                    label="Create Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    required
                    value={userData.password}
                    onChange={getUserData}

                />

                <div style={{ margin: 10 }}>
                    {errorMsg && <p style={{ margin: 0, color: "red" }}>{errorMsg}</p>}
                </div>

                <button disabled={submitButtonDisabled} type="submit" onClick={handelSubmit}>Signup</button>

                <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
            </form>

        </div>
    )

}

export default Signup;