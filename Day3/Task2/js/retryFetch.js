export async function retryFetch(fetchFunction, retries = 1) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchFunction();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
