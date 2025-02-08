import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function Header() {
  return (
    <View style={styles.headerView}>
      <TouchableOpacity
        onPress={() => {
          console.log("profile");
        }}
      >
        <Image
          style={styles.headerProfile}
          source={require("@/assets/images/ppdummy.jpg")}
        />
      </TouchableOpacity>
      <Text style={styles.appTitle}>SONDERART</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log("add");
        }}
      >
        <IconSymbol
          name="plus"
          size={32}
          color="#000"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  headerProfile: {
    borderRadius: "100%",
    height: 60,
    width: 60,
  },
  addButton: {
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 100,
    height: 48,
    width: 48,
    color: "#FFFFFF",
    justifyContent: "center",
    fontSize: 128,
    marginLeft: 12,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Jomhurai",
    backgroundColor: "#630000",
    color: "#FFFFFF",
    padding: 8,
    margin: 0,
    lineHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
});
