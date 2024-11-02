import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import {
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchTopRatedMovies, fetchUpcomingMovies } from "./MovieDb";
import ProgressBar from "./Progress";

const SearchedMovies = ({ searchedMovieData }) => {
  const { height, width } = Dimensions.get("window");
  const { id, data } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const image = "https://image.tmdb.org/t/p/w500";

  function onMoviePress(ele) {
    router.push({ pathname: "/movie", params: { id: ele.id } });
  }

  useEffect(() => {
    if (!searchedMovieData) {
      if (id == "Upcoming") {
        getUpcomingsMovies();
      } else if (id == "Top Rated") {
        getTopRatedMovies();
      }
    } else {
      setMovies(searchedMovieData);
    }
  }, []);

  async function getUpcomingsMovies(page1) {
    setLoading(true);
    let data = await fetchUpcomingMovies({ page: page1 || "1" });
    setMovies((prev) => [...prev, ...data.data.results]);
    setLoading(false);
  }
  async function getTopRatedMovies(page1) {
    setLoading(true);
    let data = await fetchTopRatedMovies({ page: page1 || "1" });
    setMovies((prev) => [...prev, ...data.data.results]);
    setLoading(false);
  }

  function onEndReaced() {
    if (id == "Upcoming") {
      getUpcomingsMovies(page + 1);
      setpage((prev) => prev + 1);
    } else if (id == "Top Rated") {
      getTopRatedMovies(page + 1);
      setpage((prev) => prev + 1);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableNativeFeedback onPress={() => onMoviePress(item)}>
      <View
        style={{ height: height * 0.35, width: width * 0.45 }}
        className="flex flex-col items-center overflow-hidden rounded-xl"
      >
        <Image
          className="w-full h-[90%] rounded-xl object-cover"
          source={
            item.poster_path
              ? { uri: `${image}${item.poster_path}` }
              : require("./../assets/images/movieImageNotFound.jpg")
          }
        />
        <Text className="text-sm font-semibold mb-4 text-neutral-400">
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );

  return (
    <View className="flex-1 p-3">
      <FlatList
        data={movies}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => `${item.id}-${index}-${page}`}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={onEndReaced}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          !loading ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : null
        }
      />
    </View>
  );
};
export default SearchedMovies;
