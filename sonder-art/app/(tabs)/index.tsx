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

export default function HomeScreen() {
  const [search, setSearch] = React.useState("");

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
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    alignItems: "center",
    columnGap: 14,
  },
  searchBar: {
    width: "90%",
    height: 35,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
  },
});
