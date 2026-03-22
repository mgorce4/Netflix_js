import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  // Charger l'utilisateur depuis localStorage au démarrage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // On garde le mock pour le moment
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`,
      };
      // Enregistrer les données de l'utilisateur dans le localStorage :
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  // Fonction d'inscription
  const register = async (name, email, password) => {
    // TODO : faire une fonction d'inscription similaire à login,
    try {
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: Date.now(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`,
      };
      // Enregistrer les données de l'utilisateur dans le localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  // Fonction de déconnexion
  const logout = () => {
    // TODO : Supprimez l’utilisateur enregistré en mémoire:
    localStorage.removeItem("user");
    setUser(null);
  };
  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    //XXXX
    return !!user;
  };
  // Mettre à jour le profil
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    // Mettre à jour et stocker l’utilisateur
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  //On met à disposition les éléments pour être utilisés dans les composants
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    updateProfile,
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {" "}
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
}
// Hook personnalisé
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
