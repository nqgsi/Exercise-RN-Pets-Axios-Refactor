import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pet Adoption",
          headerStyle: {
            backgroundColor: "#f9e3be",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
