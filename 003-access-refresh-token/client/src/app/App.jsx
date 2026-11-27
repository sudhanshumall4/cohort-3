import router from "./app.routes";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "../modules/auth/context/AuthContext";
const App = () => {
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
};
export default App;