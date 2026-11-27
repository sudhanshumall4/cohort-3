import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {

    const { user } = useContext(AuthContext);

    if (!user) {
        return <h2>No user logged in</h2>;
    }

    return (
        <div>
            <h1>Profile</h1>

            <h2>Name: {user.name}</h2>

            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;