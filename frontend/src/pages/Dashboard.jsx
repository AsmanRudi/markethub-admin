import { useEffect, useState } from "react";
import { Users, Package, Tags, ShoppingCart } from "lucide-react";
import api from "../services/api"

const cards = [
    { key: "users", title: "Totak Users", icon: Users },
    { key: "products", title: "Total Produk", icon: Package },
    { key: "categories", title: "Total Categories", icon: Tags },
    { key: "orders", title: "Total Order", icon: ShoppingCart },
];

export default function Dashboard() {
    const [counts, setCounts] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all(
            cards.map(async (card) => {
                const { data } = await api.get(`/${card.key}`);
                return [card.key, data.data.length];
            })
        )
            .then((results) => setCounts(Object.fromEntries(results)))
            .catch(() => setError("Gagal mengambil statistik dari API"));
    }, []);

    return (
        <section>
            <div className="page-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Ringkasan data MarketHub</p>
                </div>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <div className="stats-grid">
                {cards.map(({ key, title, icon: Icon }) => (
                    <article className="stat-card" key={key}>
                        <div className="stat-icon"><Icon size={22} /></div>
                        <p>{title}</p>
                        <strong>{counts[key] ?? "—"}</strong>
                    </article>
                ))}
            </div>
        </section>
    );
}