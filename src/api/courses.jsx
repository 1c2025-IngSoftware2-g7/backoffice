// This file contains the API calls related to courses management

import { COURSES } from "./back_services";

export const getAllCourses = async () => {
    const res = await fetch(`${COURSES}/courses`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        // credentials: "include"  // send session cookies
    });

    console.log("res", res);
    
  
    if (!res.ok) {
        console.error("Error fetching users:", res.status);
        throw new Error("Failed to fetch users");
    }
    const response = await res.json();
    return response;
  };