import { useState } from "react";

function LoginForm() {
  // État pour stocker email et mot de passe
  const [form, setForm] = useState({ email: "", password: "" });

  // Gère la modification des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-xs mx-auto mt-10"
    >
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border rounded px-3 py-2"
        autoComplete="email"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Mot de passe"
        className="border rounded px-3 py-2"
        autoComplete="current-password"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white rounded px-4 py-2 hover:bg-primary-dark transition-colors"
      >
        Valider
      </button>
    </form>
  );
}
export default LoginForm;
