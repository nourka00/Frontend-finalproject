import { useState, useContext } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import '../style/form.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      setError(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
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