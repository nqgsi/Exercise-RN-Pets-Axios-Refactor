import axois from "axios";

export const instance = axois.create({
  baseURL: "https://pets-react-query-backend.eapi.joincoded.com",
});
interface NewPet {
  name: string;
  image: string;
  type: string;
  adopted: 1 | 0;
}
export const TakePets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};
export const Deletepets = async (id: number) => {
  const response = await instance.delete(`/${id}`);
};

export const Postpet = async (Newpet: NewPet) => {
  const response = await instance.post("/add", Newpet);
};
