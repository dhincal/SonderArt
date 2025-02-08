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
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";

export default function CreateEventPage() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("https://api.pulth.com/api/events");
      return res.json();
    },
  });
  const { getToken } = useAuth();

  const [eventName, setEventName] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [eventCity, setEventCity] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventImage, setEventImage] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");

  const user = useUser();
  const createNewEvent = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://api.pulth.com/api/events", {
        method: "PUT",
        body: JSON.stringify({
          name: eventName,
          eventTime: eventDate,
          eventDescription: eventDescription,
          city: eventCity,
          location: eventLocation,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      return res.json();
    },
  });

  useFonts({
    Jomhurai: require("../../assets/fonts/Jomhuria-Regular.ttf"),
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.mainView}>
            <TextInput
              style={styles.searchBar}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
              placeholderTextColor={"#640000"}
            />
            <TextInput
              value={eventLocation}
              onChangeText={setEventLocation}
              style={styles.searchBar}
              placeholder="Event Location"
              placeholderTextColor={"#640000"}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Event City"
              value={eventCity}
              onChangeText={setEventCity}
              placeholderTextColor={"#640000"}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Date Of Event: mm/dd/yyyy hh:mm"
              placeholderTextColor={"#640000"}
              value={eventDate}
              onChangeText={setEventDate}
            />
            <TextInput
              style={styles.textArea}
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="Event Description"
              placeholderTextColor={"#640000"}
              multiline={true}
            />
            <TouchableOpacity
              onPress={() => {
                createNewEvent.mutate();
              }}
              style={styles.addEventButton}
            >
              <Text
                style={{
                  color: "#640000",
                  fontFamily: "Jomhurai",
                  fontSize: 36,
                  marginTop: 4,
                }}
              >
                Create Event
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  searchBar: {
    width: "90%",
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 32,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    fontFamily: "Jomhurai",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  textArea: {
    width: "90%",
    height: 150,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 32,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    fontFamily: "Jomhurai",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  mainView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
    paddingBottom: 100,
    width: "100%",
  },
  addEventButton: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});
