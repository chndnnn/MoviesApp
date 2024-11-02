import { Dimensions, Image, Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { XMarkIcon, SearchIconOutline } from "react-native-heroicons/outline";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchedMovies from "../components/SearchedMovies";
import ProgressBar from "../components/Progress";
import { useEffect, useState } from "react";
import { fetchSearchedMovies } from "../components/MovieDb";

const SearchScreen = () => {
  const ios = Platform.OS == "ios";
  const { width } = Dimensions.get("window");
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showLodaing, setShowLoading] = useState(true);
  const [searchedMovies, setSearchedMovies] = useState();
  const [searchedText, setSearchedText] = useState();
  function onCancelPress() {
    router.back();
  }

  useEffect(() => {
    let debounce = setTimeout(() => {
      if (searchedText) {
        getSearchedMovie();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchedText]);

  async function getSearchedMovie() {
    setShowLoading(false);
    const data = await fetchSearchedMovies(searchedText);
    setSearchedMovies(data.data.results);
    setShowLoading(true);
  }
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="p-1">
        <View
          className={`flex flex-row bg-neutral-900 rounded-full justify-between px-2 p-2 items-center ${
            !ios && "mt-12"
          }`}
        >
          <TextInput
            placeholderTextColor="grey"
            placeholder="Search movies"
            onChangeText={(e) => setSearchedText(e)}
            className="text-white  flex-1 p-2 border-neutral-500 w-[80%] px-2 rounded"
          />
          <TouchableOpacity onPress={onCancelPress}>
            <View className=" p-2 rounded-full bg-neutral-700">
              <XMarkIcon color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {(searchedMovies && searchedMovies.length > 0) || id ? (
        showLodaing ? (
          <SearchedMovies searchedMovieData={searchedMovies} />
        ) : (
          <ProgressBar />
        )
      ) : (
        <View
          style={{ width }}
          className="overflow-hidden flex items-center justify-center"
        >
          <Image
            className="w-[80%] mix-blend-multiply  rounded-lg"
            source={require("./../assets/images/MovieTime.webp")}
            style={{ resizeMode: "contain" }}
          ></Image>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
