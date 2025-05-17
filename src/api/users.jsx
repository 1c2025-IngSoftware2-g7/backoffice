// This file contains the API calls related to user management

import { USERS, GATEWAY } from "./back_services";
import { authFetch } from "./middleware";

// Only Admin can login
export const loginUser = async (email, password) => {
    console.log("Logging in: ", email, password);
    const res = await fetch(`${GATEWAY}/users/admin/login`, { 
        method: "POST",
        headers: { 
            // Accept: 'application/json',
            "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include"  // send session cookies
    });

    console.log("HOLAAAA res", res);
    const response = await res.json();

      if (!res.ok) {
        // response.json()
        console.error("Error logging in:", response);
        throw new Error("Invalid credentials");
      };

      console.log("Login response: ", response);

      return response;
  };


export const getAllUsers = async () => {
    const res = await authFetch(`${GATEWAY}/users/admin`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"  // send session cookies
    });
  
    console.log("res", res);

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
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_email: adminData.email, admin_password: adminData.password, uuid: userId}),
    });

    console.log("res", res);

    if (!res.ok) {
        console.error("Error blocking user:", res.status);
        throw new Error("Failed to block user");
    }

    const response = await res.json();
    return response;
}