import React, { useState } from "react";
import {
  TextInput,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Deletepets, instance, Postpet } from "@/api/petsApi";
import axios from "axios";
import { AddPets } from "@/api/PetFunc";
import { Pet } from "@/data/pets";
import {
  mutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface NewPet {
  name: string;
  image: string;
  type: string;
  adopted: 1 | 0;
}
const AddPet = () => {
  const [newPet, setNewPet] = useState<NewPet>({
    name: "",
    image: "",
    type: "",
    adopted: 0,
  });

  const handleSubmit = async (pet: NewPet) => {
    const res = await axios.post("/add", newPet);
    console.log(res.status);

    if (res.status === 201 || res.status === 200) {
      setNewPet({
        name: "",
        image: "",
        type: "",
        adopted: 0,
      });
      const AddPets = async (NewPet: Pet) => {
        return await instance.post("/add", NewPet);
      };
    }
  };

  const queryClient = useQueryClient();
  const { data, mutate } = useMutation({
    mutationKey: ["post"],
    mutationFn: Postpet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PetsQuery"] });
    },
  });

  const postbutton = () => {
    mutate(newPet);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <View style={[styles.filterContainer, { alignContent: "center" }]}>
        <TextInput
          placeholder="Name"
          style={styles.searchInput}
          onChangeText={(text) => setNewPet({ ...newPet, name: text })}
        />
      </View>
      <View style={[styles.filterContainer, { alignContent: "center" }]}>
        <TextInput
          placeholder="Image Url"
          style={styles.searchInput}
          onChangeText={(text) => setNewPet({ ...newPet, image: text })}
        />
      </View>
      <View style={[styles.filterContainer, { alignContent: "center" }]}>
        <TextInput
          placeholder="Type"
          style={styles.searchInput}
          onChangeText={(text) => setNewPet({ ...newPet, type: text })}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.filterButton} onPress={AddPet}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    width: "100%",
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
