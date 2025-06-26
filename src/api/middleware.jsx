// Fetch requests to the Users API

"server";
import { removeUserLoginData } from "../utils/storage";
import { Alert } from "@mui/material";

let errorHandlers = [];

export function addErrorHandler(handler) {
  errorHandlers.push(handler);
}

export function removeErrorHandler(handler) {
  const ind = errorHandlers.indexOf(handler);
  if (ind >= 0) {
    errorHandlers.splice(ind, 1);
  }
}

export function clearHandlers() {
  errorHandlers = [];
}

class MiddlewareError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "MiddlewareError";
    this.status = status;
    this.handled = false;
  }
}

export async function checkOkErrorResponse(response, errorMessage) {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const body = await response.json();
      if (body.detail) errorMessage = body.detail;
      else if (body.message) errorMessage = body.message;
    } else {
      errorMessage += " code:" + response.status;
    }
    throw new MiddlewareError(errorMessage, response.status);
  }
}

export function checkError(error) {
  for (const handler of errorHandlers) {
    if (handler(error)) {
      error.handled = true;
      return;
    }
  }
}

export async function authFetch(url, options, message = null) {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const uuid = userData.uuid;

    options.headers["X-User-UUID"] = uuid; // agregá el header

    const response = await fetch(url, options);
    console.log("Response from authFetch:", response);

    await checkOkErrorResponse(response, message ?? "Error:");

    return response;
  } catch (error) {
    console.log(
      "Auth error at",
      options.method ?? "GET",
      url,
      "message",
      message
    );

    if (error.status === 403) {
      console.warn("Unauthorized. Redirecting to login...");
      // window.location.href = "/";
      alert(
        "You no longer have access to this page. Contact your administrator."
      );
      removeUserLoginData();
      window.location.reload();
      throw error;
    }

    checkError(error);
    throw error;
  }
}
