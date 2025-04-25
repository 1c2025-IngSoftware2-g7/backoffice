/// Layout when user is logged in
/// Includes the sidebar and topbar
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const LayoutWhenLogged = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        {children}
      </main>
    </div>
  );
}

export default LayoutWhenLogged;