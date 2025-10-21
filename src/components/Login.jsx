import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { email, password } = formData;

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        try {
            // Example API call — replace with your backend route
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.token);
                setSuccess("Login successful!");
                setFormData({ email: "", password: "" });
                window.location.href = "/passwords"; // redirect to password manager
            } else {
                setError(result.message || "Invalid credentials.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                {success && <p className="text-green-500 text-center mb-2">{success}</p>}

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-gray-600">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-200"
                >
                    Log In
                </button>

                <p className="text-center text-sm mt-4 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline"> Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
