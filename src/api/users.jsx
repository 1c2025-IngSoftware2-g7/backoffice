// This file contains the API calls related to user management

import { USERS, GATEWAY } from "./back_services";
import { authFetch } from "./middleware";

// Only Admin can login
export const loginUser = async (email, password) => {
  console.log("Logging in: ", email, password);
  const res = await fetch(`${GATEWAY}/users/admin/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  return res;
};

export const getAllUsers = async () => {
  const res = await authFetch(`${GATEWAY}/users/admin`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
  });

  if (!res.ok) {
    console.error("Error fetching users:", res.status);
    throw new Error("Failed to fetch users");
  }

  const response = await res.json();
  console.log("get all users:", response);
  return response;
};

export const changeUserStatus = async (adminData, userId) => {
  console.log("Changing user status: ", adminData, userId);
  const res = await authFetch(`${GATEWAY}/users/admin/status`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
    body: JSON.stringify({
      admin_email: adminData.email,
      admin_password: adminData.password,
      uuid: userId,
    }),
  });

  if (!res.ok) {
    console.error("Error blocking user:", res.status);
    throw new Error("Failed to block user");
  }
  return await res.json();
};
