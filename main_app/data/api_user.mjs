export async function api(method, path, data) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include" 
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(path, options);

  if (!res.ok) {
   
    const errorBody = await res.json(); 
    throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorBody.message || 'Unknown error'}`);
  }

  return res.json();
}