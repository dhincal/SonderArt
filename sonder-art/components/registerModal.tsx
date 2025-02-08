import React, { ReactElement } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Modal,
  Button,
} from "react-native";

import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { IconSymbol } from "./ui/IconSymbol";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function RegisterModal(props: Props) {
  const [eventDate, setEventDate] = React.useState(dayjs());
  const [open, setOpen] = React.useState(false);

  return (
    <Modal animationType="slide" visible={props.isVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <DateTimePicker
          mode="single"
          date={eventDate}
          initialView="time"
          timePicker={true}
          selectedItemColor="#640000"
          minDate={new Date()}
          onChange={(params) => {
            if (params.date) {
              setEventDate(dayjs(params.date));
            }
          }}
          height={170}
        ></DateTimePicker>

        <TouchableOpacity
          onPress={() => {
            props.onClose();
          }}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "80%",
    width: "90%",
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    top: "10%",
    borderWidth: 2,
    borderColor: "#000",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
