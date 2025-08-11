import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
