import { Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { XMarkIcon, SearchIconOutline } from "react-native-heroicons/outline";
import { useRouter } from "expo-router";
import SearchedMovies from "../components/SearchedMovies";
import ProgressBar from "../components/Progress";
import { useEffect, useState } from "react";
import { fetchSearchedMovies } from "../components/MovieDb";

const SearchScreen = () => {
  const ios = Platform.OS == "ios";
  const router = useRouter();
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
      {showLodaing ? (
        <SearchedMovies searchedMovieData={searchedMovies} />
      ) : (
        <ProgressBar />
      )}
    </View>
  );
};

export default SearchScreen;
