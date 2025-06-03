import { useAuthContext } from "./AuthProvider.js";

const useAuth = () => {
  const { accessToken, login, logout, refreshAccessToken, user} = useAuthContext();

  return {
    accessToken,
    login,
    logout,
    refreshAccessToken,
    user,
    isAuthenticated: !!accessToken,
  };
};

export default useAuth;
