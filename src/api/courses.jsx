// This file contains the API calls related to courses management

import { COURSES, GATEWAY } from "./back_services";
import { authFetch } from "./middleware";

export const getAllCourses = async () => {
    const res = await authFetch(`${COURSES}/courses/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("res", res);
    
  
    if (!res.ok) {
        console.error("Error fetching users:", res.status);
        throw new Error("Failed to fetch users");
    }
    const response = await res.json();
    return response;
  };