// Connects to the backend to handle admin info

import { USERS, GATEWAY } from "./back_services";


// Current admin is able to create a new admin
export const createAdmin = async (adminData) => {
    try {
      const response = await fetch(GATEWAY+"/users/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });
  
      if (!response.ok) {
        console.log("Error creating admin:", response.statusText);
        throw new Error("Failed to create admin");
      }

      console.log("Admin created successfully");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  };