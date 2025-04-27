// This file contains the API calls related to user management

import { USERS } from "./back_services";

// Only Admin can login
export const loginUser = async (email, password) => {
    console.log("Logging in: ", email, password);
    // `${USERS}/users/login`
    // "http://localhost:8080/users/login"
    const res = await fetch(`${USERS}/users/login`, { ////////////falta /admin
        method: "POST",
        headers: { 
            Accept: 'application/json',
            "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

      if (!res.ok) throw new Error("Invalid credentials");

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
        // credentials: "include"  // send session cookies
    });
  
    if (!res.ok) {
        console.error("Error fetching users:", res.status);
        throw new Error("Failed to fetch users");
    }
  
    const response = await res.json();
    console.log("get all users:", response);
    return response;
  };