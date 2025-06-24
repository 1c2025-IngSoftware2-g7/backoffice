// Connects to the backend to handle admin info

import { USERS, GATEWAY } from "./back_services";
import { authFetch } from "./middleware";

// Current admin is able to create a new admin
export const createAdmin = async (adminData) => {
  try {
    const response = await authFetch(`${GATEWAY}/users/admin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Skip-Session": "true",
      },
      body: JSON.stringify(adminData),
    });

    console.log("Response from createAdmin:", response);

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
