import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import useApi  from "../../../shared/api";

const Register = () => {
    const navigate = useNavigate();
    const api = useApi();
    const { setUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {

            const response = await api.post("/auth/register", form);
            console.log(response.data);
            setUser(response.data.data.user);
            navigate("/profile");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                err.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>
            <h1>Register</h1>

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

            </form>
        </div>
    );
};

export default Register;