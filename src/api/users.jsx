// This file contains the API calls related to user management

import { USERS, GATEWAY } from "./back_services";

// Only Admin can login
export const loginUser = async (email, password) => {
    console.log("Logging in: ", email, password);
    // `${USERS}/users/login`
    // "http://localhost:8080/users/login"
    const res = await fetch(`${USERS}/users/admin/login`, { 
        method: "POST",
        headers: { 
            Accept: 'application/json',
            "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"  // send session cookies
    });

    console.log("res", res);

      if (!res.ok) {
        console.error("Error logging in:", res);
        throw new Error("Invalid credentials");
      };

      const response = await res.json();
      console.log("Login response: ", response);

      return response;
  };


export const getAllUsers = async () => {
    const res = await fetch(`${USERS}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${session}`,
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
    const res = await fetch(`${USERS}/users/admin/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_email: adminData.email, admin_password: adminData.password, userId}),
    });

    if (!res.ok) {
        console.error("Error blocking user:", res.status);
        throw new Error("Failed to block user");
    }

    const response = await res.json();
    return response;
}