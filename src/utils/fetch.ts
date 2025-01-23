import { Request } from 'express'

interface ProxyResponse {
  data: any;
  status: number;
  headers: Headers;
}

export const fetchUrl = async (url: string, req: Request): Promise<ProxyResponse> => {
  // Forward the original request configuration
  const config: RequestInit = {
    method: req.method,
    headers: new Headers(req.headers as Record<string, string>),
    // Forward body for all methods except GET and HEAD
    body: ['GET', 'HEAD'].includes(req.method.toUpperCase()) 
      ? undefined 
      : req.is('application/json') 
        ? JSON.stringify(req.body)
        : req.body,
    // Enable credentials to handle cookies
    credentials: 'include'
  }

  // Remove problematic headers that should be handled by fetch
  if (config.headers instanceof Headers) {
    config.headers.delete('host');
    config.headers.delete('content-length');
    // Remove connection-specific headers
    config.headers.delete('connection');
    config.headers.delete('keep-alive');
  }
  
  try {
    const response = await fetch(url, config);
    let data;
    const contentType = response.headers.get('content-type');
    
    // Handle response based on content type
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    return { 
      data, 
      status: response.status,
      headers: response.headers
    };
  } catch (error) {
    return {
      data: { error: 'Failed to fetch from target URL' },
      status: 500,
      headers: new Headers()
    };
  }
}
