import { TouchableNativeFeedback } from "react-native";
import { Image } from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

const MovieList = ({ name1 }) => {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const name = "Superman vs batman";

  function onTrendingImagePressed(ele) {
    console.log(ele);
    router.push({ pathname: "/movie", params: { name: ele } });
  }
  return (
    <View className="w-full p-2 ">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-xl font-semibold">{name1}</Text>
        <Text className="text-yellow-400 font-medium">See All</Text>
      </View>
      <View className="w-full border border-neutral-800 mb-3">
        <ScrollView horizontal={true}>
          {[1, 2, 3, 4, 5].map((ele, i) => {
            return (
              <TouchableNativeFeedback
                onPress={() => onTrendingImagePressed(ele)}
              >
                <View
                  key={i}
                  className="mr-2 h-[150] w-[100px] flex flex-col justify-center items-center"
                >
                  <Image
                    className="w-full rounded h-[120] object-cover"
                    source={require("./../assets/images/SuperBat.jpg")}
                  ></Image>
                  <Text className="text-sm text-white">
                    {name.length > 10 ? name.slice(0, 10) + "..." : name}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default MovieList;
