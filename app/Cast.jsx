import { Image, Platform, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { BackspaceIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";

const Cast = () => {
  const ios = Platform.OS == "ios";
  return (
    <ScrollView className="bg-neutral-800 p-1">
      <SafeAreaView>
        <View
          className={`${
            !ios && "mt-12"
          } w-full flex flex-row justify-between px-3`}
        >
          <TouchableOpacity>
            <BackspaceIcon size={28} color={"orange"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <HeartIcon size={28} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="w-full justify-center items-center">
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10,
          }}
          className="h-72 w-72 rounded-full overflow-hidden border border-neutral-500 shadow-slate-200"
        >
          <Image
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            source={require("./../assets/images/Henry.jpg")}
          />
        </View>
      </View>
      <View>
        <Text className="text-white font-bold text-3xl mt-2 text-center">
          Henry Clavil
        </Text>
        <Text className="text-neutral-400 text-xl mt-2 text-center">
          United states , London
        </Text>
      </View>
      <View className="w-full border flex flex-row p-2 justify-evenly mt-4 bg-neutral-700 rounded-full">
        <View
          className="px-2"
          style={{ borderRightWidth: 1, borderRightColor: "black" }}
        >
          <Text className="text-white text-center">Gender</Text>
          <Text className="text-neutral-400 text-center">Male</Text>
        </View>
        <View
          className="px-2 "
          style={{ borderRightWidth: 1, borderRightColor: "black" }}
        >
          <Text className="text-white text-center">Birth Day</Text>
          <Text className="text-neutral-400 text-center">17-03-2002</Text>
        </View>
        <View
          className="px-2"
          style={{ borderRightWidth: 1, borderRightColor: "black" }}
        >
          <Text className="text-white text-center">Known For</Text>
          <Text className="text-neutral-400 text-center">Acting</Text>
        </View>
        <View className="px-2">
          <Text className="text-white text-center">Popularity</Text>
          <Text className="text-neutral-400 text-center">64.2</Text>
        </View>
      </View>
      <View className="mt-2 px-2">
        <Text className="text-xl text-white">Biography</Text>
        <Text className="text-neutral-400">
          Henry William Dalgliesh Cavill was born on the Bailiwick of Jersey, a
          British Crown dependency in the Channel Islands. His mother, Marianne
          (Dalgliesh), a housewife, was also born on Jersey, and is of Irish,
          Scottish and English ancestry. Henry's father, Colin Richard Cavill, a
          stockbroker, is of English origin (born in Chester, England). Henry is
          the second youngest son, with four brothers. He was privately educated
          at St. Michael's Preparatory School in Saint Saviour, Jersey before
          attending Stowe School in Buckinghamshire, England.
        </Text>
      </View>
      <View className="mt-2">
        <MovieList hideSeeAll={true} name1={"Movies"} />
      </View>
    </ScrollView>
  );
};

export default Cast;
