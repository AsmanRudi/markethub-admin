
import { useState } from "react";
import { Store, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@markethub.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", data.token);
      onLogin(data.admin);
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
        <div className="login-orb login-orb-left" aria-hidden="true" />
        <div className="login-orb login-orb-right" aria-hidden="true" />
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <div className="brand-icon">
            <Store size={27} strokeWidth={2.2} />
          </div>
        </div>

        <div className="login-heading">
          <h1>MarketHub</h1>
          <p>Masuk ke dashboard admin untuk mengelola marketplace.</p>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}

        <div className="login-fields">
          <label htmlFor="login-email">Email Admin</label>
          <div className="login-input-wrap">
            <Mail size={18} />
            <input
              id="login-email"
              type="email"
              placeholder="Masukkan email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <label htmlFor="login-password">Password</label>
          <div className="login-input-wrap">
            <LockKeyhole size={18} />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="login-submit"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Masuk ke Dashboard"}
        </button>

        <p className="login-footer">
          MarketHub Admin Portal
        </p>
      </form>
    </main>
  );
}
