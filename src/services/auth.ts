export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', { // fetching from our Next.js API route 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

// save access token to localSotrage
if (data.session?.access_token) {
  localStorage.setItem('token', data.session.access_token); // save token to localStorage
  localStorage.setItem('user', JSON.stringify(data.user)); // save user data to localStorage
}

  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function signup(email: string, password: string) {
  const res = await fetch('/api/auth/signup', { // fetching from our Next.js API route 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.session?.access_token) {
  localStorage.setItem('token', data.session.access_token); // save token to localStorage
  localStorage.setItem('user', JSON.stringify(data.user)); // save user data to localStorage
}

  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
} 

export function logout() {
  localStorage.removeItem('token'); 
  localStorage.removeItem('user'); 
  return fetch('/api/auth/login', { // return to the login page
  });
}
