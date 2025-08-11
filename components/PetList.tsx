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
import { instance } from "@/api/petsApi";
import { TakePets } from "@/api/petsApi";
import axios from "axios";
import PetItem from "./PetItem";
import { router } from "expo-router";
import { Query, QueryClient, useQuery } from "@tanstack/react-query";
import { GetPets } from "@/api/PetFunc";

const PetList = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetPets(), [];
  });

  const { data, isLoading } = useQuery({
    queryKey: ["PetsQuery"],
    queryFn: TakePets,
  });
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <View style={[styles.filterContainer, { alignContent: "center" }]}>
        <TextInput placeholder="Search for a pet" style={styles.searchInput} />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push("/addPet")}
        >
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
      {data.map((pet: any) => (
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
