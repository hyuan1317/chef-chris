import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      const appReady = async () => {
        await SplashScreen.hideAsync();
      };
      appReady();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(groceryList)/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}
