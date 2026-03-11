export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const handleImageUpload = async (profileImage: File) => {
  const base64Image = await fileToBase64(profileImage);

  console.log("profileImage:", base64Image);

  const imageS3Link = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/files/uploadImage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ProfileImage: base64Image }),
    },
  );

  const profileImageLink = await imageS3Link.json();

  console.log("profileImageLink:", profileImageLink);
  return profileImageLink;
};

export const handleSignup = async (
  username: string,
  email: string,
  password: string,
  profileImage: string,
) => {
  console.log("criando conta para:", username, email, password, profileImage);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, profileImage }),
      },
    );

    const data = await response.json();

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    if (!response.ok) {
      throw new Error(data.message || "Erro ao criar conta");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    console.log(
      "process.env.NEXT_PUBLIC_API_URL:",
      process.env.NEXT_PUBLIC_API_URL,
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

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

export const handleUploadImage = () => {};
