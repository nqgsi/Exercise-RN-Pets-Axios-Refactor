import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Pet } from "@/data/pets";
import { router } from "expo-router";

interface PetItemProps {
  pet: Pet;
}

const PetItem = ({ pet }: PetItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.petInfo}>
        <TouchableOpacity onPress={() => router.push(`/${pet.id}`)}>
          <Image source={{ uri: pet.image }} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.name}>{pet.name}</Text>

        <Text style={styles.description}>{pet.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.petButton}>
          <Text style={styles.buttonText}>Pet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adoptButton}>
          <Text style={styles.buttonText}>Adopt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f9e3be",
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  petInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    color: "purple",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "black",
    fontWeight: "light",
  },
  type: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  petButton: {
    backgroundColor: "#4ade80",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  adoptButton: {
    backgroundColor: "#f43f5e",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    marginBottom: 10,
  },
});
