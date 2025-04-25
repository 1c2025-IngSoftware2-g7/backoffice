// This file contains the API calls related to courses management

import { COURSES } from "../api/back_services";

export const getAllCourses = async () => {
    const res = await fetch(COURSES + "/courses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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