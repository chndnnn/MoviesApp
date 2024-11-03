import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import {
  fetchMoviedescription,
  getData,
  removeCompletely,
} from "../components/MovieDb";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { BackspaceIcon, TrashIcon } from "react-native-heroicons/outline";
import { useRouter } from "expo-router";
import ProgressBar from "../components/Progress";

const FavouritesScreen = () => {
  const { height, width } = Dimensions.get("window");
  const image = "https://image.tmdb.org/t/p/w500";
  const ios = Platform.OS == "ios";
  const router = useRouter();
  const [loading, showloading] = useState(false);
  const [favMoviesId, setFavMoviesId] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    getAllFavouriteMovies();
  }, []);

  async function getAllFavouriteMovies() {
    let data = (await getData("FAVORITES_KEY")) || [];
    setFavMoviesId(data);
  }

  useEffect(() => {
    fetchMovieDesc();
  }, [favMoviesId]);

  async function fetchMovieDesc() {
    try {
      showloading(true);
      const allMovies = await Promise.all(
        favMoviesId.map(async (id) => {
          const { data } = await fetchMoviedescription(id);
          return data;
        })
      );
      setFavMovies(allMovies);
      showloading(false);
    } catch (e) {
      console.log(e);
      showloading(false);
    }
  }

  function onDeletePress() {
    removeCompletelyData();
    router.back();
  }

  function onBackPress() {
    router.back();
  }
  function onMoviePress(ele) {
    router.push({ pathname: "/movie", params: { id: ele.id } });
  }

  const removeCompletelyData = async () => {
    await removeCompletely();
  };

  function handleDeletePress() {
    if (favMovies.length > 0) {
      Alert.alert(
        "Delete Confirmation",
        "Are you sure you want to remove all your favourites?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => onDeletePress(),
            style: "destructive",
          },
        ]
      );
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
          source={{ uri: `${image}${item.poster_path}` }}
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
    <View className="flex-1 bg-neutral-800 p-2">
      <SafeAreaView className={`${!ios && "mt-12"} p-2`}>
        <View className="w-full  flex p-2 flex-row justify-between items-center">
          <TouchableOpacity onPress={onBackPress}>
            <BackspaceIcon size={28} color={"orange"} />
          </TouchableOpacity>
          <View className="flex flex-row items-center">
            <Text className="text-orange-300  text-3xl">F</Text>
            <Text className="text-white  text-2xl">avourites</Text>
          </View>

          <TouchableOpacity onPress={handleDeletePress}>
            <TrashIcon size={28} color={"red"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="w-full border border-black mb-2"></View>
      {favMovies && favMovies.length > 0 ? (
        <FlatList
          data={favMovies}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => `${item.id}`}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <View
          style={{ width }}
          className="overflow-hidden flex items-center justify-center flex-1 "
        >
          {/* <Image
            className="w-[80%] rounded-lg"
            source={require("./../assets/images/book.png")}
            style={{ resizeMode: "contain" }}
          ></Image> */}
          <Text className="text-white">No Favourites found!!</Text>
        </View>
      )}
      {loading && <ProgressBar />}
    </View>
  );
};

export default FavouritesScreen;
