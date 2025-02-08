import React, { ReactElement, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Modal,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import {
  SignedIn,
  SignedOut,
  useUser,
  useClerk,
  useAuth,
} from "@clerk/clerk-expo";
import { IconSymbol } from "./ui/IconSymbol";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@tanstack/react-query";
type Props = {
  isVisible: boolean;
  postID: string;
  onClose: () => void;
};

export default function ReviewModal(props: Props) {
  const { getToken } = useAuth();
  const { isLoading, isSuccess, data, error } = useQuery({
    queryKey: ["applications", props.postID],
    queryFn: async () => {
      const res = await fetch("https://api.pulth.com/api/applications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      return res.json();
    },
  });

  return (
    <Modal animationType="slide" visible={props.isVisible} transparent={true}>
      <ScrollView>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Review Your Applications</Text>
          {data?.map((event: any) => {
            if (event.id == props.postID) {
              return (
                <View
                  key={event.id}
                  style={{ width: "90%", backgroundColor: "#000000" }}
                >
                  <Text style={{ fontSize: 32 }}>{data.fullName}</Text>
                  <Image
                    source={data.imageUrl}
                    style={{ height: 40, width: 40 }}
                  />
                  <Text style={{ fontSize: 32 }}>{event.eventLocation}</Text>
                  <Text style={{ fontSize: 32 }}>{event.eventDescription}</Text>
                </View>
              );
            }
          })}
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => props.onClose()}
          >
            <Text style={{ fontSize: 32 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "80%",
    width: "90%",
    minHeight: "80%",
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
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Jomhuria",
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
  buttons: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
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
});
