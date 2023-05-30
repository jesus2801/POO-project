import axios from "axios";

export const client = axios.create({
  baseURL: process.env.API_URL,
});

//actualizar el token del cliente axios
export const updateToken = () => {
  client.defaults.headers["authorization"] = localStorage.getItem("token");
};

//eliminar el token del cliente axios
export const deleteToken = () => {
  delete client.defaults.headers["authorization"];
};
