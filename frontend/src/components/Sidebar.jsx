import { 
    Store,
    LayoutDashboard,
    Users,
    Package,
    Tags,
    ShoppingCart,
    LogOut,
 } from "lucide-react";
 

 const menus = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "orders", label: "Orders", icon: ShoppingCart },
 ];

  export default function Sidebar({ active, onNavigate, onLogout }) {
    return (
    <aside className="sidebar">
        <div className="sidebard-brand">
            <div className="brand-icon">
                <Store size={25} strokeWidth={2.2} />
            </div>
                <div className="sidebar-brand-text">
                    <strong>MarketHub</strong>
                    <small>ADMIN PANEL</small>
                </div>
            </div>

            <p className="menu-caption">MENU UTAMA</p>

            <nav>
                {menus.map(({ id, label, icon: Icon }) => (
                    <button
                    key={id}
                    className={`nav-item ${active === id ? "active" : ""}`}
                    onClick={() => onNavigate(id)}
                    >
                        <Icon size={19} />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>
            <div className="sidebar-bottom">
                <button className="nav-item Logout" onClick={onLogout}>
                    <LogOut size={19} />
                    <span>Logout</span>
                </button>
            </div>


    </aside>
    );

}