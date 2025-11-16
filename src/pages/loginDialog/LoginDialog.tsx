import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../api/api';
import { saveToken } from '../../auth/Auth';

type Props = {
  open: boolean;
  onClose: () => void;
};

const LoginDialog: React.FC<Props> = ({ open, onClose }) => {
  const [username, setUsername] = useState(''); // optionally prefill 'fitClub'
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const res = await loginRequest(username, password);
      if (res.ok && res.token) {
        saveToken(res.token);
        onClose();
        navigate('/membership'); 
      } else {
        setErr(res.message || 'Login failed');
      }
    } catch (error) {
      setErr('Network error');
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'rgba(0,0,0,0.4)'
    }}>
      <form onSubmit={submit} style={{ background: 'white', padding: 20, borderRadius: 8, minWidth: 320 }}>
        <h3>Login</h3>
        <div>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {err && <div style={{ color: 'red', marginTop: 8 }}>{err}</div>}
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>
          (For demo use username: <b>fitClub</b> / password: <b>fitClub1234</b>)
        </div>
      </form>
    </div>
  );
};

export default LoginDialog;
