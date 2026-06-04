export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

// save access token to localSotrage
if (data.session?.access_token) {
  localStorage.setItem('token', data.session.access_token); 
  localStorage.setItem('user', JSON.stringify(data.user)); 
}

  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data; 
}

export async function signup(email: string, password: string) {
  const res = await fetch('/api/auth/signup', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.session?.access_token) {
  localStorage.setItem('token', data.session.access_token); 
  localStorage.setItem('user', JSON.stringify(data.user)); 
}

  if (!res.ok) throw new Error(data.error || 'Signup failed'); // eventuallly I need graceful error handling here and other places
  return data;
} 

export function logout() {
  localStorage.removeItem('token'); 
  localStorage.removeItem('user'); 
  window.location.href = "/"
}
