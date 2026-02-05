export async function api(method, path, data) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(path, options);

  // Check if the response was successful (status code 200-299)
  if (!res.ok) {
    // If not successful, throw an error or return a specific error object
    // This allows the calling function to handle different error statuses
    const errorBody = await res.json(); // Attempt to parse error details
    throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorBody.message || 'Unknown error'}`);
  }

  return res.json();
}