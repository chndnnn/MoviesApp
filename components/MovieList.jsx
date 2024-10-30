import { TouchableNativeFeedback } from "react-native";
import { Image } from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

const MovieList = ({ name1, hideSeeAll }) => {
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
        {!hideSeeAll && (
          <Text className="text-yellow-400 font-medium">See All</Text>
        )}
      </View>
      <View className="w-full border  border-neutral-800 mb-3 ">
        <ScrollView horizontal={true}>
          {[1, 2, 3, 4, 5].map((ele, i) => {
            return (
              <TouchableNativeFeedback
                key={i}
                onPress={() => onTrendingImagePressed(ele)}
              >
                <View className="mr-2 h-[180] w-[120px] flex flex-col justify-center items-center">
                  <Image
                    className="w-full rounded-xl h-[150] object-cover"
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
