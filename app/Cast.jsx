import { Image, Platform, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { BackspaceIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchPersonDetails, fetchPersonMovies } from "../components/MovieDb";
import ProgressBar from "../components/Progress";
import { useRouter } from "expo-router";

const Cast = () => {
  const ios = Platform.OS == "ios";
  const router = useRouter();
  const [personDetails, setPersonDetails] = useState();
  const [showLodaing, setShowLoading] = useState(true);
  const [personMovies, setPersonMovies] = useState();
  const { id } = useLocalSearchParams();
  const image = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, []);

  async function getPersonDetails() {
    const data = await fetchPersonDetails(id);
    setPersonDetails(data.data);
    setShowLoading(false);
  }

  async function getPersonMovies() {
    const data = await fetchPersonMovies(id);
    setPersonMovies(data.data.cast);
    setShowLoading(false);
  }

  function onBackPress() {
    router.back();
  }
  return (
    <ScrollView className="bg-neutral-800 p-1">
      <SafeAreaView>
        <View
          className={`${
            !ios && "mt-12"
          } w-full flex flex-row justify-between px-3`}
        >
          <TouchableOpacity onPress={onBackPress}>
            <BackspaceIcon size={28} color={"orange"} />
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
      <View className="w-full justify-center items-center">
        <View className="h-72 w-72 rounded-full overflow-hidden border border-neutral-500">
          <Image
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            source={{
              uri: `${image}${personDetails && personDetails.profile_path}`,
            }}
          />
        </View>
      </View>
      <View>
        <Text className="text-white font-bold text-3xl mt-2 text-center">
          {personDetails && personDetails.name}
        </Text>
        <Text className="text-neutral-400 text-xl mt-2 text-center">
          {personDetails && personDetails.place_of_birth}
        </Text>
      </View>
      <View className="w-full border flex flex-row p-2 justify-evenly mt-4 bg-neutral-700 rounded-full">
        <View
          className="px-2"
          style={{ borderRightWidth: 1, borderRightColor: "black" }}
        >
          <Text className="text-white text-center">Gender</Text>
          <Text className="text-neutral-400 text-center">
            {personDetails && personDetails.gender != 1 ? "Male" : "Female"}
          </Text>
        </View>
        <View
          className="px-2 "
          style={{ borderRightWidth: 1, borderRightColor: "black" }}
        >
          <Text className="text-white text-center">Birth Day</Text>
          <Text className="text-neutral-400 text-center">
            {personDetails && personDetails.birthday}
          </Text>
        </View>
        <View
          className="px-2"
          style={{ borderRightWidth: 1, borderRightColor: "black" }}
        >
          <Text className="text-white text-center">Known For</Text>
          <Text className="text-neutral-400 text-center">
            {personDetails && personDetails.known_for_department}
          </Text>
        </View>
        <View className="px-2">
          <Text className="text-white text-center">Popularity</Text>
          <Text className="text-neutral-400 text-center">
            {personDetails && personDetails.popularity}
          </Text>
        </View>
      </View>
      <View className="mt-2 px-2">
        <Text className="text-xl text-white">Biography</Text>
        <Text className="text-neutral-400">
          {personDetails && personDetails.biography}
        </Text>
      </View>
      <View className="mt-2">
        {personMovies && personMovies.length > 0 && (
          <MovieList
            movieData={personMovies}
            hideSeeAll={true}
            name1={"Movies"}
          />
        )}
      </View>
      {showLodaing && <ProgressBar />}
    </ScrollView>
  );
};

export default Cast;
