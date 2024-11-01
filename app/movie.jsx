import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { BackspaceIcon, HeartIcon } from "react-native-heroicons/solid";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TopCast from "../components/TopCast";
import MovieList from "../components/MovieList";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import ProgressBar from "../components/Progress";
import {
  fetchMovieCasts,
  fetchMoviedescription,
  fetchSimilarMovie,
} from "./../components/MovieDb";

const Movie = () => {
  const { height, width } = Dimensions.get("window");
  const router = useRouter();
  const [showLodaing, setShowLoading] = useState(true);
  const [description, setDescription] = useState();
  const [similar, setSimilar] = useState();
  const [casts, setCasts] = useState();
  const { id } = useLocalSearchParams();
  const image = "https://image.tmdb.org/t/p/w500";
  const name1 = "Superman vs batman Superman";

  function onBackClick() {
    router.back();
  }

  useEffect(() => {
    getMovieDescription();
    getMovieCasts();
    getSimilarMovie();
  }, []);

  async function getMovieDescription() {
    const data = await fetchMoviedescription(id);
    setDescription(data.data);
    setShowLoading(false);
  }
  async function getMovieCasts() {
    const data = await fetchMovieCasts(id);
    setCasts(data.data.cast);
    setShowLoading(false);
  }
  async function getSimilarMovie() {
    const data = await fetchSimilarMovie(id);
    setSimilar(data.data.results);
    setShowLoading(false);
  }

  fetchSimilarMovie;
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView>
        <ScrollView>
          <View style={{ position: "relative", width }}>
            {/* Overlay View */}
            <View
              style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                zIndex: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity onPress={onBackClick}>
                <BackspaceIcon size={28} color={"orange"} />
              </TouchableOpacity>
              <TouchableOpacity>
                <HeartIcon size={28} color={"white"} />
              </TouchableOpacity>
            </View>

            {/* Background Image */}
            <Image
              style={{ height: height * 0.6, width }}
              source={{
                uri: `${image}${description && description.poster_path}`,
              }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(39, 39, 42, 0.1)",
                "rgba(39, 39, 42, 0.8)",
                "#27272a",
              ]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: height * 0.6,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
          <View className="mt-[-100] z-30">
            <Text className="text-white text-center  text-3xl font-semibold">
              {description && description.title}
            </Text>
            <View>
              <Text className="text-center text-neutral-400 mt-2">
                {description && description.status} .{" "}
                {description && description.release_date.split("-")[0]} .{" "}
                {description && description.runtime}min
              </Text>
              <View className="w-full flex flex-row justify-center mt-2">
                {description &&
                  description.genres.map((gener, index) => (
                    <Text key={index} className="text-center text-neutral-400">
                      {gener.name}{" "}
                      {index + 1 < description.genres.length && " .  "}
                    </Text>
                  ))}
              </View>
              <View className="w-full flex flex-row justify-center mt-2 px-1">
                <Text className="text-center text-neutral-500">
                  {description && description.overview}
                </Text>
              </View>
              <View>
                {casts && casts.length > 0 && (
                  <TopCast castData={casts} name1={"Top Casts"} />
                )}
              </View>
              <View>
                {similar && similar.length > 0 && (
                  <MovieList
                    movieData={similar}
                    hideSeeAll={true}
                    name1={"Similar Movies"}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {showLodaing && <ProgressBar />}
    </View>
  );
};

export default Movie;
