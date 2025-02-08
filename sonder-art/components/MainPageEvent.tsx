import React, { ReactElement } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { IconSymbol } from "./ui/IconSymbol";

type Props = {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventImage: string;
  eventDescription: string;
  eventAttendees: number;
  eventOrganizer: string;
  eventOrganizerImage: string;
};

export default function MainPageEvent(props: Props) {
  const user = useUser();

  return (
    <View style={styles.eventContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.eventImage }} style={styles.eventImage} />
      </View>
      <View style={styles.eventDetails}>
        <View style={styles.detailView}>
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Name</Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: "right",
              width: "60%",
            }}
          >
            {props.eventName}
          </Text>
        </View>
        <View style={styles.detailView}>
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Date</Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: "right",
              width: "60%",
            }}
          >
            {props.eventDate}
          </Text>
        </View>
        <View style={styles.detailView}>
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Location</Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: "right",
              width: "60%",
            }}
          >
            {props.eventLocation}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "flex-start",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: props.eventOrganizerImage }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <Text
              style={{ color: "#ffffff", fontSize: 20, textAlign: "right" }}
            >
              {props.eventOrganizer}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => {
              console.log("add");
            }}
          >
            <IconSymbol
              name="bookmark.circle"
              size={32}
              color="#fff"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#630000",
    width: "90%",
    borderRadius: 10,
    paddingBottom: 16,
  },
  eventDetails: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 14,
    columnGap: 20,
    height: 200,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#000",
  },
  detailView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookmarkButton: {},
});
