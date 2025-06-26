// This file contains the API calls related to courses management

import { COURSES, GATEWAY } from "./back_services";
import { authFetch } from "./middleware";

export const getAllCourses = async () => {
  const res = await authFetch(`${GATEWAY}/courses`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
  });

  console.log("res", res);

  if (!res.ok) {
    console.error("Error fetching courses:", res.status);
    throw new Error("Failed to fetch courses");
  }
  const response = await res.json();
  console.log("ALL COURSES", response);
  return response;
};

export const getAllAuxTeachers = async () => {};

export async function changeHelperPermissions(
  helper_id,
  course_id,
  creator_id,
  permissions
) {
  const endpointAdd = `${GATEWAY}/courses/assistants/${course_id}`;
  console.log(
    "COURSE: ",
    course_id,
    " HELPER: ",
    helper_id,
    "PERMISSIONS: ",
    permissions
  );

  const response = await authFetch(endpointAdd, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
    body: JSON.stringify({
      assistant_id: helper_id,
      course_id: course_id,
      owner_id: creator_id,
      permissions: permissions,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update permissions for helper ${helper_id} in course ${course_id}`
    );
  }
}

export async function requestHelperPermissions(helper_id, course_id) {
  const endpoint = `${GATEWAY}/courses/assistants/${course_id}/assistant/${helper_id}`;
  console.log("COURSE: ", course_id, " HELPER: ", helper_id);

  const response = await authFetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch permissions for helper ${helper_id} in course ${course_id}`
    );
  }

  let res = await response.json();
  return res;
}

export async function getEnrolledCoursesForUser(user_id) {
  const endpoint = `${GATEWAY}/courses/enrolled_courses/${encodeURIComponent(
    user_id
  )}`;

  console.log("GET ENROLL COURSES FOR ID ", user_id, "? endpoint ", endpoint);

  try {
    const response = await authFetch(
      endpoint,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Skip-Session": "true",
        },
      },
      "failed request of courses"
    );
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function getOwnedCoursesForUser(user_id) {
  const endpoint = `${GATEWAY}/courses/courses_owned/${encodeURIComponent(
    user_id
  )}`;

  try {
    const response = await authFetch(
      endpoint,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Skip-Session": "true",
        },
      },
      "failed request of courses"
    );

    return await response.json();
  } catch (error) {
    return [];
  }
}
