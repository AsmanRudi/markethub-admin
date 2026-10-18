import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import  api  from "../services/api";

const configs = {
    users: {
        title: "Managemen Users",
        endpoint: "/users",
        id: "us_id",
        fields: [
            ["us_name", "Nama", "text"],
            ["us_email", "Email", "email"],
            ["us_password", "Password", "password"],
            ["us_phone_number", "Nomor Telepon", "text"],
            ["us_address", "Alamat", "text"],
        ],
    },
    products: {
        title: "Managemen Products",
        endpoint: "/products",
        id: "pd_id",
        fields: [
            ["pd_code", "Kode produk", "text"],
            ["pd_ct_id", "ID kategori", "text"],
            ["pd_name", "Nama Produck", "text"],
            ["pd_price", "Harga", "number"],
        ],
    },
    categories: {
        title: "Managemen Categories",
        endpoint: "/categories",
        id: "ct_id",
        fields: [
            ["ct_code", "Kode kategori", "text"],
            ["ct_name", "Nama kategori", "text"],
        ],
    },
    orders: {
        title: "Managemen Orders",
        endpoint: "/orders",
        id: "or_id",
        fields: [
            ["or_pd_id", "ID produk", "text"],
            ["or_amount", "Jumlah", "number"],
        ],
    },
};

export default function Management({ type }) {
    const config = configs[type];
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({});
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loadData() {
        setLoading(true);
        setError("");

        try {
            const { data } = await api.get(config.endpoint);
            setItems(data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [type]);

    function startCreate() {
        setEditing(null);
        setForm({});
        setShowForm(true);
    }

    function startEdit(item) {
        setEditing(item[config.id]);
        setForm(
            Object.fromEntries(
                config.fields.map(([key]) => [key, item[key] ?? ""])
            )
        );
        setShowForm(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const payload = { ...form };

        for (const [key, , fieldType] of config.fields) {
            if (fieldType === "number" && payload[key] !== "") {
                payload[key] = Number(payload[key]);
            }
        }

        try {
            if (editing) {
                await api.put(`${config.endpoint}/${editing}`, payload);
            } else {
                await api.post(config.endpoint, payload);
            }

            setShowForm(false);
            setForm({});
            setEditing(null);
            await loadData();
        } catch (err) {
            setError(err.response?.data?.message || "Gagal menyimpan data");
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Yakin ingin menghapus data ini")) return;

        try {
            await api.delete(`${config.endpoint}/${id}`);
            await loadData();
        } catch (err) {
            setError(err.response?.data?.message || "Gagal menghapus data");
        }
    }

    return (
        <section>
            <div className="page-heading">
                <div>
                    <h1>{config.title}</h1>
                    <p>Kelola data marketplace melalui REST API.</p>
                </div>

                <button className="primary-button" onClick={startCreate}>
                    <Plus size={18} /> Tambah Data
                </button>
            </div>

            {showForm && (
                <form className="data-form" onSubmit={handleSubmit}>
                    <h2>{editing ? "Edit data" : "Tambah Data Baru"}</h2>

                    <div className="form-grid">
                        {config.fields.map(([key, label, fieldType]) => (
                            <label key={key}>
                                {label}
                                <input
                                    type={fieldType}
                                    min={fieldType === "number" ? 1 : undefined}
                                    step={fieldType === "number" ? "any" : undefined}
                                    required={key !== "us_password" || !editing}
                                    value={form[key] ?? ""}
                                    onChange={(e) =>
                                        setForm({ ...form, [key]: e.target.value })
                                    }
                                    />
                            </label>
                        ))}
                    </div><br />

                    <div className="form-action">
                        <button type="button" className="secondary-button"
                            onClick={() => setShowForm(false)}>
                                Batal
                        </button>
                        <button className="primary-button">
                            Simpan
                        </button>
                    </div>
                </form>
            )}

            <div className="table-card">
                <div className="table-toolbar">
                    <strong>{items.length} data</strong>
                    <button className="icon-button" onClick={loadData}>
                        <RefreshCw size={17} /> Refresh
                    </button>
                </div>

                {loading ? (
                    <p className="empty-state">Memuat data...</p>
                ) : (
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    {config.fields
                                        .filter(([key]) => key !== "us_password")
                                        .map(([key, label]) =><th key={key}>{label}</th>)}
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item) => (
                                    <tr key={item[config.id] ?? item._id}>
                                        {config.fields
                                            .filter(([key]) => key !== "us_password")
                                            .map(([key]) => (
                                                <td key={key}>{String(item[key] ?? "-")}</td>
                                            ))}
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                            className="icon-button"
                                            title="Edit"
                                            onClick={() => startEdit(item)}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                            className="icon-button delete-button"
                                            title="Hapus"
                                            onClick={() => handleDelete(item[config.id])}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    </tr>
                                ))}

                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan={config.fields.length + 1}>
                                            <p className="empty-state">
                                                Belum ada data. Tambahkan Data pertama.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}