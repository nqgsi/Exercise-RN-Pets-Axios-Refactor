import axois from "axios";

export const instance = axois.create({
  baseURL: "https://pets-react-query-backend.eapi.joincoded.com",
});
export const TakePets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};
