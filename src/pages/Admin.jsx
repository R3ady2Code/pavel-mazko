import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/admin.scss";

const AdminPage = () => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authKey"));

    const navigate = useNavigate();

    const handleLogin = () => {
        if (password === "AR27J2@nc6coWu1") {
            const authKey = btoa(`${password}`);
            localStorage.setItem("authKey", authKey);
            setIsAuthenticated(true);
            navigate("/yjw48jkxqr/product");
        } else {
            alert("Please enter both username and password");
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/yjw48jkxqr/product");
    }, []);

    return (
        <div className="admin-app-container">
            <div className="login-container">
                <h1>???</h1>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button className="login-button" onClick={handleLogin}>
                    !!!
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
