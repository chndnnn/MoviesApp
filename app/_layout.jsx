import { Text, View } from "react-native";
import { Slot, Stack } from "expo-router";

// Import your global CSS file
import "../global.css";

const _Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" />
      <Stack.Screen name="movie" /> */}
    </Stack>
  );
};

export default _Layout;
