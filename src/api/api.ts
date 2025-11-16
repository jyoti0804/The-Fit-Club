const API_BASE = 'http://localhost:5173';

export async function loginRequest(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function verifyToken(token: string) {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  return res.json();
}

export async function getMembershipData(token: string) {
  const res = await fetch(`${API_BASE}/membership-data`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
}
