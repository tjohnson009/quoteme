  export interface Quote {                                                                                                                                                  
      id: number;                                                                                                                                                           
      user_id: string;                                                                                                                                                      
      text: string;                           
      author: string;                                                                                                                                                       
      tags: string[];                                                                                                                                                       
      notes: string;                                                                                                                                                        
      created_at: string;                                                                                                                                                 
  } 

function getToken(): string {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('You are not logged in or authenticated.')
    }
    return token
}

export async function getQuotes(): Promise<Quote[]> {
    // read token from storage, if no token throw an error or return empty array
    const token = getToken()
    // fetch
    const res = await fetch('/api/quotes', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    //parse and return
    const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Something went wrong with getting your quotes.');
  return data.userSavedQuotes; 
}

export async function createQuote(text: string, author: string, tags?: string[], notes?: string): Promise<Quote> {
    const token = getToken()

    const res = await fetch('/api/quotes', {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({ text, author, tags, notes })
    })

    return await res.json()
}

export async function deleteQuote(id: number): Promise<any> {
    const token = getToken()

    const res = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` },
    })

    return await res.json()
}

export async function editQuote(id: number, updates: { text?: string; author?: string; tags?: string[]; notes?: string }): Promise<any> {
    const token = getToken()

    const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,             
        }, 
        body: JSON.stringify(updates)
    })

    return res.json()
}