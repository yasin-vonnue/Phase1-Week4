import { HttpError } from "./HttpError.js";

export async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
}
