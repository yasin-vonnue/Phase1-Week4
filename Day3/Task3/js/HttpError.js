export class HttpError extends Error {
  constructor(status, message = `HTTP error: ${status}`) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
