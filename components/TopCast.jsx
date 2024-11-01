import { TouchableNativeFeedback } from "react-native";
import { Image } from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

const TopCast = ({ castData, name1 }) => {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const name = "Superman vs batman";
  const name2 = "henry";
  const image = "https://image.tmdb.org/t/p/w500";

  function onTrendingImagePressed(ele) {
    router.push({ pathname: "/Cast", params: { id: ele.id } });
  }
  return (
    <View className="w-full p-2 ">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-xl font-semibold">{name1}</Text>
      </View>
      <View className="w-full border border-neutral-800 mb-3">
        <ScrollView horizontal={true}>
          {castData &&
            castData.map((ele, i) => {
              return (
                <TouchableNativeFeedback
                  key={i}
                  onPress={() => onTrendingImagePressed(ele)}
                >
                  <View className="mr-3 flex flex-col">
                    <Image
                      className="w-[70] rounded-full border border-neutral-500 h-[70] object-cover"
                      source={{ uri: `${image}${ele.profile_path}` }}
                    ></Image>
                    <Text className="text-sm text-white text-center">
                      {ele.name.length > 10
                        ? ele.name.slice(0, 10) + "..."
                        : ele.name}
                    </Text>
                    <Text className="text-xs text-neutral-400 text-center">
                      {ele.character.length > 10
                        ? ele.character.slice(0, 10) + "..."
                        : ele.character}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default TopCast;
