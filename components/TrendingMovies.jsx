import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";

const TrendingMovies = ({ trendingData }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const router = useRouter();
  const image = "https://image.tmdb.org/t/p/w500";

  function onViewClick(ele) {
    router.push({ pathname: "/movie", params: { id: ele.id } });
  }

  return (
    <View className=" p-2">
      <Text className="text-white text-xl font-semibold px-3">Trending</Text>
      <View className="h-[280px] justify-center items-center">
        <Carousel
          loop
          width={width * 0.95} // Width slightly less than screen width
          height={width * 0.8} // Adjust height as needed
          autoPlay={true}
          scrollAnimationDuration={2000}
          data={trendingData ? trendingData : []}
          renderItem={({ item, index }) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() => onViewClick(item)}
            >
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: "center",
                  backgroundColor: "#555",
                  borderRadius: 10,
                  transform: [{ scale: 0.9 }],
                }}
              >
                <Image
                  source={{
                    uri: `${image}${item.poster_path}`,
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "cover contain", // Ensures the image covers the view without distortion
                  }}
                  className="rounded-xl"
                ></Image>
              </View>
            </TouchableNativeFeedback>
          )}
        />
      </View>
    </View>
  );
};

export default TrendingMovies;
