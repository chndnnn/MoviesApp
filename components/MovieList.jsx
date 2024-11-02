import { TouchableNativeFeedback } from "react-native";
import { Image } from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

const MovieList = ({ movieData, name1, hideSeeAll }) => {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const name = "Superman vs batman";
  const image = "https://image.tmdb.org/t/p/w500";

  function onTrendingImagePressed(ele) {
    router.push({ pathname: "/movie", params: { id: ele.id } });
  }

  function onSeeAllPressed() {
    router.push({
      pathname: "/SearchScreen",
      params: { id: name1 },
    });
  }
  return (
    <View className="w-full p-2 ">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-xl font-semibold">{name1}</Text>
        {!hideSeeAll && (
          <TouchableNativeFeedback onPress={onSeeAllPressed}>
            <Text className="text-yellow-400 font-medium">See All</Text>
          </TouchableNativeFeedback>
        )}
      </View>
      <View className="w-full border  border-neutral-800 mb-3 ">
        <ScrollView horizontal={true}>
          {movieData &&
            movieData.map((ele, i) => {
              return (
                <TouchableNativeFeedback
                  key={i}
                  onPress={() => onTrendingImagePressed(ele)}
                >
                  <View className="mr-2 h-[180] w-[120px] flex flex-col justify-center items-center">
                    <Image
                      className="w-full rounded-xl h-[150] object-cover"
                      source={
                        ele.poster_path
                          ? { uri: `${image}${ele.poster_path}` }
                          : require("./../assets/images/movieImageNotFound.jpg")
                      }
                    ></Image>
                    <Text className="text-sm text-white font-semibold">
                      {ele.title.length > 13
                        ? ele.title.slice(0, 13) + "..."
                        : ele.title}
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
