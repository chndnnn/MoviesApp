import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";

const TrendingMovies = () => {
  const width = Dimensions.get("window").width;
  const router = useRouter();

  function onViewClick(ele) {
    router.push({ pathname: "/movie", params: { name: ele } });
  }

  return (
    <View className=" p-2">
      <Text className="text-white text-xl font-semibold px-3">Trending</Text>
      <View className="h-[280px] justify-center items-center">
        <Carousel
          loop
          width={width * 0.95} // Width slightly less than screen width
          height={width * 0.8} // Adjust height as needed
          autoPlay={false}
          scrollAnimationDuration={2000}
          data={[1, 2, 3, 4, 5]}
          renderItem={({ index, i }) => (
            <TouchableNativeFeedback key={i} onPress={() => onViewClick(index)}>
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
                  source={require("./../assets/images/SuperBat.jpg")}
                  className="h-full w-full rounded-xl"
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
