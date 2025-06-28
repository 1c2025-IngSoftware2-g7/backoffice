// This file contains the API calls related to profiles management

import { PROFILES, GATEWAY } from "./back_services";
import { authFetch } from "./middleware";

export const getAllProfiles = async () => {
  const res = await authFetch(`${GATEWAY}/profiles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Skip-Session": "true",
    },
  });

  console.log("res", res);

  if (!res.ok) {
    console.error("Error fetching profiles:", res.status);
    throw new Error("Failed to fetch users");
  }
  const response = await res.json();
  console.log("ALL PROFILES", response);
  return response;
};
