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

export const getAllAuxTeachers = async () => {}

export async function changeHelperPermissions(
    helper_id,
    course_id,
    creator_id,
    permissions
  ) {
    const endpointAdd = `${COURSES}/courses/assistants/${course_id}`

    const response = await authFetch(endpointAdd, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistant_id: helper_id,
        course_id: course_id,
        owner_id: creator_id,
        permissions: permissions,
      }),
    })
  
    if (!response.ok) {
      throw new Error(
        `Failed to update permissions for helper ${helper_id} in course ${course_id}`
      )
    }
  }