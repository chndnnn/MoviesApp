import { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { MagnifyingGlassIcon as SearchIconOutline } from "react-native-heroicons/outline";
import { Bars3BottomLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useRouter } from "expo-router";
import ProgressBar from "../components/Progress";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../components/MovieDb";

const Home = () => {
  const router = useRouter();

  const [showLodaing, setShowLoading] = useState(true);
  const [trendingList, settrendingLists] = useState([]);
  const [upcomingList, setUpcomingListLists] = useState([]);
  const [topRatedList, setTopRatedLists] = useState([]);

  function onSearchClick() {
    router.push({ pathname: "/SearchScreen" });
  }

  useEffect(() => {
    getTrendingMovies();
    getUpcomingsMovies();
    getTopRatedMovies();
  }, []);

  async function getTrendingMovies() {
    let data = await fetchTrendingMovies();
    settrendingLists(data.data.results);
    setShowLoading(false);
  }
  async function getUpcomingsMovies() {
    let data = await fetchUpcomingMovies();
    setUpcomingListLists(data.data.results);
    setShowLoading(false);
  }
  async function getTopRatedMovies() {
    let data = await fetchTopRatedMovies();
    setTopRatedLists(data.data.results);
    setShowLoading(false);
  }

  function onFavouriteClick() {
    router.push({ pathname: "/favouritesScreen" });
  }

  return (
    <View className="flex-1 bg-neutral-800">
      {!showLodaing ? (
        <SafeAreaView className="flex-1 bg-neutral-800 mt-10 p-1">
          <View className="mb-2">
            <View className="flex flex-row justify-between items-center p-2">
              <Bars3BottomLeftIcon onPress={onFavouriteClick} color="white" />
              <View className="flex-row items-center">
                <Text className="text-yellow-500 text-3xl">M</Text>
                <Text className="text-white text-2xl font-bold">ovie</Text>
              </View>
              <TouchableOpacity onPress={onSearchClick}>
                <SearchIconOutline color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {trendingList.length > 0 && (
            <TrendingMovies trendingData={trendingList} />
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {upcomingList.length > 0 && (
              <MovieList movieData={upcomingList} name1={"Upcoming"} />
            )}
            {topRatedList.length > 0 && (
              <MovieList movieData={topRatedList} name1={"Top Rated"} />
            )}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <ProgressBar />
      )}
    </View>
  );
};

export default Home;
