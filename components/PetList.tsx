import {
  ActivityIndicator,
  ActivityIndicatorComponent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Pet } from "@/data/pets";
import { BASE_URL } from "@/api/petsApi";
import axios from "axios";
import PetItem from "./PetItem";
import { router } from "expo-router";

const PetList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      const data = res.data as Pet[];
      setPets(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <View  style={[styles.filterContainer, {alignContent: "center"}]}>
        <TextInput placeholder="Search for a pet" style={styles.searchInput} />
          <TouchableOpacity style={styles.filterButton} onPress={() => router.push("/addPet")}>
            <Text>Add</Text>
        </TouchableOpacity>
  </View>

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {loading && <ActivityIndicator size="large" />}
      {error && <Text>An Error occurred, try again later</Text>}
      {/* Pet List */}
      {pets.map((pet) => (
        <PetItem key={pet.id} pet={pet} />
      ))}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "75%",
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
