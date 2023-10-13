import { Stack } from "expo-router";
import EditPlanProvider from "@components/plans/EditPlanContext";

export default function PlansLayout() {
  return (
    <EditPlanProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="[id]"
          options={{
            presentation: "fullScreenModal",
          }}
        />
        <Stack.Screen
          name="new"
          options={{
            presentation: "fullScreenModal",
          }}
        />
      </Stack>
    </EditPlanProvider>
  );
}
