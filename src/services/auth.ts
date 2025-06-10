export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', { // fetching from our Next.js API route 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

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

  if (!res.ok) throw new Error(data.error || 'Signup failed');
  return data;
} 
