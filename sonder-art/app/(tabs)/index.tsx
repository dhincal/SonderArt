import Header from "@/components/header";
import React, { useEffect } from "react";
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
import RegisterModal from "@/components/registerModal";
import ReviewModal from "@/components/reviewModal";

export default function HomeScreen() {
  const [search, setSearch] = React.useState("");

  const [applyModal, setApplyModal] = React.useState(false);
  const [reviewModal, setReviewModal] = React.useState(false);
  const [eventId, setEventId] = React.useState("");

  const { isLoading, isSuccess, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("https://api.pulth.com/api/events");
      return res.json();
    },
  });
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
            {isSuccess ? (
              data.map((event: any) => {
                return (
                  <MainPageEvent
                    eventName={event.name}
                    eventDate={event.eventTime}
                    eventLocation={event.location}
                    eventImage="https://firebasestorage.googleapis.com/v0/b/sonderart-1be4d.firebasestorage.app/o/IMG_user_2slk0bCjiW8cUUTjg6iR1aJmjZ5.jpeg?alt=media&token=7b33381c-c4f5-4710-8f71-2508e7e7560c"
                    eventDescription={"lorem ipsum"}
                    eventAttendees={100}
                    eventOrganizer={"Event Organizer"}
                    eventOrganizerImage={""}
                    openModal={
                      event.publisher === user.user?.id
                        ? () => setReviewModal(true)
                        : () => {
                            setApplyModal(true);
                            setEventId(event.id);
                          }
                    }
                    isAuthor={event.publisher === user.user?.id}
                  />
                );
              })
            ) : (
              <Text>"Loading..."</Text>
            )}
          </View>
        </ScrollView>
        <ReviewModal
          isVisible={reviewModal}
          postID={eventId}
          onClose={() => setReviewModal(false)}
        />

        <RegisterModal
          isVisible={applyModal}
          onClose={() => {
            setApplyModal(false);
          }}
        />
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
