import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl md:text-9xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Page introuvable</h2>
      <p className="text-gray-400 mb-8">Oups ! La page que vous recherchez n'existe pas.</p>
      <button
        className="bg-primary text-white font-bold px-6 py-3 rounded hover:bg-primary-dark transition-colors"
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

export default NotFound;
