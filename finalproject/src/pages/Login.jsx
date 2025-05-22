import { useState, useContext } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import '../style/form.css';
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/materials';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
      
    } else {
      toast.error(error || "Login failed. Please try again.", {
        duration: 4000,
      });
      
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="signup-cta">
        <p>You don't have an account! Sign up</p>
        <Link to="/register">
          <button className="login-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;