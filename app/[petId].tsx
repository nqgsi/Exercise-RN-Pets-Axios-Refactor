import { BASE_URL } from "@/api/petsApi";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Pet } from "@/data/pets";
import {Stack} from "expo-router";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | undefined>(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPet = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/${petId}`);
      const data = res.data as Pet;
      setPet(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPet();
  }, []);

  const deletePet = async (petId: number) => {
    try {
      await axios.delete(`${BASE_URL}/${petId}`);
      router.back();
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:pet?.name || "Pet Details"}}/>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>An Error occurred, try again later</Text>}
      {pet && (
        <>
          <Text style={styles.name}>{pet.name}</Text>
          <Image source={{ uri: pet.image }} style={styles.image} />
          <Text style={styles.type}>Type: {pet.type}</Text>
        </>
      )}

      <View>
        {pet && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => deletePet(pet?.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
