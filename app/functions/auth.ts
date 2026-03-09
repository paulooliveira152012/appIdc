export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:5086/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro no login");
    }

    console.log("data de login:", data);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    console.log("data:", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleLogout = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("Logout realizado");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};
