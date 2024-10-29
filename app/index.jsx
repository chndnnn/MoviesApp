import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { MagnifyingGlassIcon as SearchIconOutline } from "react-native-heroicons/outline";
import { Bars3BottomLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";

const Home = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="flex-1 bg-neutral-800 mt-10 p-1">
        <View className="mb-2">
          {!searchClicked ? (
            // if search button is not clicked
            <View className="flex flex-row justify-between items-center p-2">
              <Bars3BottomLeftIcon color="white" />
              <View className="flex-row items-center">
                <Text className="text-yellow-500 text-3xl">M</Text>
                <Text className="text-white text-2xl font-bold">ovie</Text>
              </View>
              <TouchableOpacity onPress={() => setSearchClicked(true)}>
                <SearchIconOutline color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            // if search button is clicked
            <View className="flex flex-row justify-between p-2 items-center ">
              <TextInput
                placeholderTextColor="white"
                placeholder="search"
                className="text-white border border-solid border-neutral-500 w-[80%] px-2 rounded"
              />
              <View className="flex flex-row gap-2">
                <TouchableOpacity>
                  <SearchIconOutline color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSearchClicked(false)}>
                  <XMarkIcon color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TrendingMovies />
        <ScrollView showsVerticalScrollIndicator={false}>
          <MovieList name1={"Upcoming"} />
          <MovieList name1={"Top Rated"} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
