import { View } from "react-native";
import * as Progress from "react-native-progress";

const ProgressBar = () => {
  return (
    <View className="flex-1 w-full h-full absolute justify-center items-center">
      <Progress.CircleSnail color={["red", "green", "blue"]} />
    </View>
  );
};

export default ProgressBar;
