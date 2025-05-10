// This file contains the API calls related to user management

import { USERS, GATEWAY } from "./back_services";

// Only Admin can login
export const loginUser = async (email, password) => {
    console.log("Logging in: ", email, password);
    // `${USERS}/users/login`
    // "http://localhost:8080/users/login"
    const res = await fetch(`${GATEWAY}/users/admin/login`, { 
        method: "POST",
        headers: { 
            Accept: 'application/json',
            "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    const res = await fetch(`${GATEWAY}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${session}`,
        },
        // credentials: "include"  // send session cookies
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