const getLocalToken = () => localStorage.getItem("token");
const removeLocalToken = () => localStorage.setItem("token", null);
const saveLocalToken = (token) => localStorage.setItem("token", token);

export { getLocalToken, removeLocalToken, saveLocalToken };
