import { SafeAreaView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Movie = () => {
  const { name } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-neutral-800 ">
      <SafeAreaView className="mt-10">
        <Text className="text-xl text-white">Movie</Text>
        <Text className="text-xl text-white">{name}</Text>
      </SafeAreaView>
    </View>
  );
};

export default Movie;
