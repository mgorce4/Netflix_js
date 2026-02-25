import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
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
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        })
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
        <h2 className="text-2xl font-bold text-white mb-4">S'inscrire</h2>
        <div>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom"
            className={`w-full px-4 py-3 rounded bg-gray-800 text-white border ${errors.name ? "border-red-500" : "border-transparent"} focus:outline-none focus:ring-2 focus:ring-primary`}
            autoComplete="name"
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>
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
            autoComplete="new-password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmez le Mot de passe"
            className={`w-full px-4 py-3 rounded bg-gray-800 text-white border ${errors.confirmPassword ? "border-red-500" : "border-transparent"} focus:outline-none focus:ring-2 focus:ring-primary`}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 rounded mt-2 hover:bg-red-700 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
        <div className="text-center mt-2 text-gray-400">
          Déjà un compte ? {" "}
          <Link to="/login" className="text-primary hover:underline">Se connecter</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
