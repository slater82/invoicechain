import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Login (Demo)</h2>

      <button
        style={{ padding: '10px 20px', marginTop: 20 }}
        onClick={() => navigate('/dashboard')}
      >
        Login as MSME (Demo)
      </button>
    </div>
  );
}
