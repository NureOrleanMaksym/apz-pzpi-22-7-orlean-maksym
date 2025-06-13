import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

// Предопределенные пользователи
const PREDEFINED_USERS = {
  admin: {
    email: "admin@example.com",
    password: "admin123",
    name: "Администратор",
    role: "admin",
  },
  user: {
    email: "user@example.com",
    password: "user123",
    name: "Пользователь",
    role: "user",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, есть ли сохраненный пользователь
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Проверяем учетные данные
    const user = Object.values(PREDEFINED_USERS).find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userData = {
        email: user.email,
        name: user.name,
        role: user.role,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
