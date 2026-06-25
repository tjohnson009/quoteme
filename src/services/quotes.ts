  export interface Quote {                                                                                                                                                  
      id: number;                                                                                                                                                           
      user_id: string;                                                                                                                                                      
      text: string;                           
      author: string;                                                                                                                                                       
      tags: string[];                                                                                                                                                       
      notes: string;                                                                                                                                                        
      created_at: string;                                                                                                                                                 
  } 

    interface DeleteQuoteResponse {
      message: string;                                                                                                                                                      
      deletedQuoteData: Quote[];
  }                                                                                                                                                                         
                                                                                                                                                                          
  interface EditQuoteResponse {
      updatedData: Quote[];
  }

function getToken(): string {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('You are not logged in or authenticated.')
    }
    return token
}

export async function getQuotes(): Promise<Quote[]> {
    const token = getToken()
    const res = await fetch('/api/quotes', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
        return [];
    }

    const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Something went wrong with getting your quotes.');
  return data.userSavedQuotes || []; 
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
 
    const data = await res.json()
    return data.insertedData[0]
}

export async function deleteQuote(id: number): Promise<DeleteQuoteResponse> {
    const token = getToken()

    const res = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}` },
    })

    return await res.json()
}

export async function editQuote(id: number, updates: { text?: string; author?: string; tags?: string[]; notes?: string }): Promise<EditQuoteResponse> {
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