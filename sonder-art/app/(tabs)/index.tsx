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

export default function HomeScreen() {
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
            <View style={styles.locationsView}>
              <TouchableOpacity style={styles.extraLocation}>
                <Text style={styles.extraLocationText}>Michigan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraLocation}>
                <Text style={styles.extraLocationText}>Detroit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraLocation}>
                <Text style={styles.extraLocationText}>London</Text>
              </TouchableOpacity>
            </View>
            <MainPageEvent
              eventName="Fundraiser for Dino Skeletons in chicago"
              eventDate="27th December 2025"
              eventLocation="Field Museum, Chicago IL"
              eventImage="https://peabody.yale.edu/sites/default/files/styles/cropped_image/public/page-content/2024-08/5K7A9328-HDR_crop_card_2x.jpg?itok=7WCPnWID"
              eventDescription="Event Description"
              eventAttendees={100}
              eventOrganizer="Event Organizer"
              eventOrganizerImage={user.user?.imageUrl ?? ""}
            />
            <MainPageEvent
              eventName="Fundraiser for Dino Skeletons in chicago"
              eventDate="27th December 2025"
              eventLocation="Field Museum, Chicago IL"
              eventImage="https://peabody.yale.edu/sites/default/files/styles/cropped_image/public/page-content/2024-08/5K7A9328-HDR_crop_card_2x.jpg?itok=7WCPnWID"
              eventDescription="Event Description"
              eventAttendees={100}
              eventOrganizer="Event Organizer"
              eventOrganizerImage={user.user?.imageUrl ?? ""}
            />
            <MainPageEvent
              eventName="Fundraiser for Dino Skeletons in chicago"
              eventDate="27th December 2025"
              eventLocation="Field Museum, Chicago IL"
              eventImage="https://peabody.yale.edu/sites/default/files/styles/cropped_image/public/page-content/2024-08/5K7A9328-HDR_crop_card_2x.jpg?itok=7WCPnWID"
              eventDescription="Event Description"
              eventAttendees={100}
              eventOrganizer="Event Organizer"
              eventOrganizerImage={user.user?.imageUrl ?? ""}
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
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FFFFFF",
  },
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 14,
    paddingBottom: 100,
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
  locationsView: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  extraLocation: {
    borderRadius: 100,
    width: "30%",
    backgroundColor: "#898989",
    paddingVertical: 4,
    paddingHorizontal: 24,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  extraLocationText: {
    marginTop: 4,
    fontSize: 24,
    color: "white",
    fontFamily: "Jomhurai",
    textAlign: "center",
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
