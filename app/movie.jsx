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

const Movie = () => {
  const { height, width } = Dimensions.get("window");
  const { name } = useLocalSearchParams();
  const name1 = "Superman vs batman Superman";

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
              <TouchableOpacity>
                <BackspaceIcon size={28} color={"orange"} />
              </TouchableOpacity>
              <TouchableOpacity>
                <HeartIcon size={28} color={"white"} />
              </TouchableOpacity>
            </View>

            {/* Background Image */}
            <Image
              style={{ height: height * 0.6, width }}
              source={require("./../assets/images/SuperBat.jpg")}
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
              {name1}
            </Text>
            <View>
              <Text className="text-center text-neutral-400">
                Released . 2020 . 170min
              </Text>
              <View className="w-full flex flex-row justify-center">
                <Text className="text-center text-neutral-400">Action .</Text>
                <Text className="text-center text-neutral-400"> Thrill .</Text>
                <Text className="text-center text-neutral-400"> Comedy</Text>
              </View>
              <View className="w-full flex flex-row justify-center px-1">
                <Text className="text-center text-neutral-500">
                  Batman v Superman: Dawn of Justice (2016) is a superhero film
                  directed by Zack Snyder that pits two iconic DC heroes,
                  Superman and Batman, against each other. It stars Henry Cavill
                  as Superman (Clark Kent) and Ben Affleck as Batman (Bruce
                  Wayne). The film explores themes of power, justice, and the
                  consequences of superhero actions on humanity.
                </Text>
              </View>
              <View>
                <TopCast name1={"Top Casts"} />
              </View>
              <View>
                <MovieList hideSeeAll={true} name1={"Similar Movies"} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Movie;
