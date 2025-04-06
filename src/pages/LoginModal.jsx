

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // TODO: Validation

    const fakeToken = "123abc"; // ejemplo
    login(fakeToken);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Usuario" required />
      <input type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
