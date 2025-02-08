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
import MainPageEvent from "@/components/MainPageEvent";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export default function RSVPPage() {
  const [search, setSearch] = React.useState("");

  const { isLoading, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("https://api.pulth.com/api/events");
      return res.json();
    },
  });

  console.log(data);

  const user = useUser();
  useFonts({
    Jomhurai: require("../../assets/fonts/Jomhuria-Regular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <Header />
        <ScrollView></ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
