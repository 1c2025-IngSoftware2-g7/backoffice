// This file contains the API calls related to user management

import { USERS } from "../api/back_services";

export const loginUser = async (email, password) => {
    console.log("Logging in: ", email, password);
    const res = await fetch(`${USERS}/users/login`, { ////////////falta /admin
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data.user;
  };


export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};


export const getAllUsers = async () => {

    const res = await fetch(`${USERS}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        // credentials: "include"  // send session cookies
    });
  
    if (!res.ok) {
        console.error("Error fetching users:", res.statusText);
        throw new Error("Failed to fetch users");
    }
  
    const data = await res.json();
    console.log(data)
    return data;
  };