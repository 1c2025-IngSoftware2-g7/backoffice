import { createContext, useContext, useEffect, useState } from "react";
import { getAllCourses } from "../api/courses";
import { getAllUsers } from "../api/users";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [courses, setCourses] = useState(null);
  const { isLogged } = useAuth();

  const fetchData = async () => {
    if (!isLogged) {
      return;
    }

    try {
      const [usersRes, coursesRes] = await Promise.all([
        getAllUsers(),
        getAllCourses(),
      ]);
      setUsers(usersRes.data);
      setCourses(coursesRes);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const refreshUsers = async () => {
    if (!isLogged) {
      return;
    }
    try {
      const usersRes = await getAllUsers();
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Error refreshing users", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLogged]);

  return (
    <DataContext.Provider
      value={{
        users,
        courses,
        refreshData: fetchData,
        refreshUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
