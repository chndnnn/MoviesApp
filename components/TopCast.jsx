import { TouchableNativeFeedback } from "react-native";
import { Image } from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

const TopCast = ({ name1 }) => {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const name = "Superman vs batman";
  const name2 = "henry";

  function onTrendingImagePressed(ele) {
    console.log(ele);
    router.push({ pathname: "/Cast", params: { name: ele } });
  }
  return (
    <View className="w-full p-2 ">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-xl font-semibold">{name1}</Text>
      </View>
      <View className="w-full border border-neutral-800 mb-3">
        <ScrollView horizontal={true}>
          {[1, 2, 3, 4, 5].map((ele, i) => {
            return (
              <TouchableNativeFeedback
                key={i}
                onPress={() => onTrendingImagePressed(ele)}
              >
                <View className="mr-3 flex flex-col ">
                  <Image
                    className="w-[70] rounded-full h-[70] object-cover"
                    source={require("./../assets/images/Henry.jpg")}
                  ></Image>
                  <Text className="text-sm text-white text-center">
                    {name.length > 10 ? name.slice(0, 10) + "..." : name}
                  </Text>
                  <Text className="text-sm text-neutral-400 text-center">
                    {name2.length > 10 ? name2.slice(0, 10) + "..." : name2}
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
