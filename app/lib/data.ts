const api =
  (process.env.EXPO_PUBLIC_API_URL as string) || "http://localhost:3000";

export const register = (data: RegisterState) => {
  return fetch(`${api}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};
