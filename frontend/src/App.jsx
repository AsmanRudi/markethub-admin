import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Management from "./pages/Management";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [admin, setAdmin] = useState(() => {
    const token = sessionStorage.getItem("token");
    const saveAdmin = sessionStorage.getItem("admin");

    return token && saveAdmin ? JSON.parse(saveAdmin) : null;
  });

  const [active, setActive] = useState("dashboard");

  function handleLogin(user) {
    sessionStorage.setItem("admin", JSON.stringify(user));
    setAdmin(user);
  }

  async function handleLogout() {
    try {
      const { default: api } = await import("./services/api");
      await api.post("/auth/logout");
    } catch {
      // Token tetap dihapus walaupun request logout gagal.
    } finally {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("admin");
      setAdmin(null);
      setActive("dashboard");
    }
  }
  if (!admin) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
      active={active}
      onNavigate={setActive}
      onLogout={handleLogout}
      />

      <main className="main-content">
        <header className="topbar">
          <span className="admin-label">{admin.email}</span>
        </header>

        {active === "dashboard" ? (
          <Dashboard />
        ) : (
          <Management key={active} type={active} />
        )}
      </main>
    </div>
  );
}