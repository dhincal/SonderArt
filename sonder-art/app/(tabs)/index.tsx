import Header from "@/components/header";
import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-screens";
import { useFonts } from "expo-font";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  const [search, setSearch] = React.useState("");
  useFonts({
    Jomhurai: require("../../assets/fonts/Jomhuria-Regular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.mainContainer}>
            <TextInput
              style={styles.searchBar}
              onChangeText={setSearch}
              value={search}
              placeholder="Search For Events..."
              placeholderTextColor={"#aaaaaa"}
            />
            <View style={styles.location}>
              <IconSymbol name="mappin.and.ellipse" size={32} color="#ffffff" />
              <Text style={styles.font}>Chicago</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 14,
  },
  searchBar: {
    width: "90%",
    height: 35,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
  },
  location: {
    width: "90%",
    borderRadius: 30,
    backgroundColor: "#630000",
    paddingHorizontal: 24,
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 4,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  font: {
    fontFamily: "Jomhurai",
    color: "#ffffff",
    fontSize: 44,
    lineHeight: 44,
    height: "auto",
    marginTop: 6,
  },
});
