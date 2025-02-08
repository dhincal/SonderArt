import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link } from "expo-router";

import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function Header() {
  const user = useUser();

  const { signOut } = useClerk();

  return (
    <View style={styles.headerView}>
      <SignedOut>
        <Link href="/(auth)/sign-in" onPress={() => console.log("logina")}>
          <View style={styles.loginButton}>
            <IconSymbol
              name="door.french.open"
              size={32}
              color={"#fff"}
              style={{ alignSelf: "center" }}
            ></IconSymbol>
          </View>
        </Link>
      </SignedOut>
      <SignedIn>
        <Link onPress={() => signOut()} href="/(auth)/sign-in">
          <Image
            style={styles.headerProfile}
            source={{ uri: user.user?.imageUrl }}
          />
        </Link>
      </SignedIn>
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
    height: 90,
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
    lineHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  loginButton: {
    borderColor: "#000",
    borderRadius: 100,
    height: 60,
    width: 60,
    backgroundColor: "#630000",
    justifyContent: "center",
  },
});
