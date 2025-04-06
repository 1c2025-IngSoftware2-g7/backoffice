import { useAuth } from "../context/AuthContext";
import { createAdmin } from "../api/admin";

const Dashboard = () => {
  const { logout } = useAuth();

  const handleCreateAdmin = async () => {

    // ejemplo
    const newAdmin = {
      email: "newadmin@example.com",
      password: "securePassword123",
    };

    try {
        const result = await createAdmin(newAdmin);
        alert(`Admin ${result.name} created successfully!`);
      } catch (err) {
        alert("There was an error creating the admin.");
      }
  };

  return (
    <div>
      <h1>Welcome to the Backoffice</h1>
      <button onClick={handleCreateAdmin}>Create Admin</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Dashboard;