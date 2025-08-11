import { router } from "expo-router";
import { instance } from "./petsApi";
import { Pet } from "@/data/pets";
export const GetPets = async () => {
  try {
    const res = await instance.get("/");
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (petId: number) => {
  try {
    await instance.delete(`/${petId}`);
    router.back();
    return true;
  } catch (error) {
    return false;
  }
};
export const AddPets = async (NewPet: Pet) => {
  try {
    const res = await instance.post("/add", NewPet);
    console.log(res.status);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
