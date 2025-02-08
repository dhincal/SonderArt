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
} from "react-native";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { IconSymbol } from "./ui/IconSymbol";
import * as ImagePicker from "expo-image-picker";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function RegisterModal(props: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  // const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   appId: process.env.FIREBASE_APP_ID,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // if (getApps().length === 0) {
  //   initializeApp(firebaseConfig);
  // }

  return (
    <Modal animationType="slide" visible={props.isVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={pickImage}>
          <IconSymbol name="photo" size={32} color="#000000" />
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )}
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
