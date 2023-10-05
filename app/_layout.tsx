import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function Root() {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
