import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: formData.email, name: formData.email.split("@")[0] })
      );
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-primary mb-8 tracking-tight">NETFILM</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-black border border-gray-700 rounded-lg p-8 w-full max-w-md flex flex-col gap-5 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Se connecter</h2>
        <div>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full px-4 py-3 rounded bg-gray-800 text-white border ${errors.email ? "border-red-500" : "border-transparent"} focus:outline-none focus:ring-2 focus:ring-primary`}
            autoComplete="email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className={`w-full px-4 py-3 rounded bg-gray-800 text-white border ${errors.password ? "border-red-500" : "border-transparent"} focus:outline-none focus:ring-2 focus:ring-primary`}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 rounded mt-2 hover:bg-red-700 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        <div className="text-center mt-2 text-gray-400">
          Pas encore de compte ? {" "}
          <Link to="/register" className="text-primary hover:underline">S'inscrire</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
