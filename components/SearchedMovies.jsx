import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { Dimensions, ScrollView, TouchableNativeFeedback } from "react-native";

const SearchedMovies = () => {
  const { height, width } = Dimensions.get("window");
  const router = useRouter();
  const name = "chandanadas chandan das";
  function onMoviePress(ele) {
    router.push({ pathname: "/movie" });
  }
  return (
    <ScrollView className="flex-1 p-3 ">
      <View className="flex flex-row gap-3 flex-wrap justify-between mb-2 ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((ele, i) => {
          return (
            <TouchableNativeFeedback onPress={() => onMoviePress(ele)} key={i}>
              <View
                style={{ height: height * 0.27, width: width * 0.45 }}
                className="flex flex-col items-center overflow-hidden rounded-xl"
              >
                <Image
                  className="w-full rounded-xl  object-cover"
                  source={require("./../assets/images/SuperBat.jpg")}
                ></Image>
                <Text className="text-sm font-semibold text-neutral-400">
                  {name.length > 20 ? name.slice(0, 20) + "..." : name}
                </Text>
              </View>
            </TouchableNativeFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default SearchedMovies;
