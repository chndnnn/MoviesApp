import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { MagnifyingGlassIcon as SearchIconOutline } from "react-native-heroicons/outline";
import { Bars3BottomLeftIcon, XMarkIcon } from "react-native-heroicons/outline";

const Home = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="flex-1 bg-neutral-800 mt-10 p-1">
        <View>
          {!searchClicked ? (
            <View className="flex flex-row justify-between p-2 items-cente">
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
            <View className="flex flex-row justify-between p-2 items-center ">
              <TextInput
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
      </SafeAreaView>
    </View>
  );
};

export default Home;
