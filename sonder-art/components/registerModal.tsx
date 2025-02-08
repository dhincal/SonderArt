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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  // const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   appId: process.env.FIREBASE_APP_ID,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // };

  const firebaseConfig = {
    apiKey: "AIzaSyDqg4n5w9v1z0q3H2Gz7l0xVj8m6u5JXfI",
    authDomain: "sonder-art.firebaseapp.com",
    projectId: "sonder-art",
    storageBucket: "sonder-art.appspot.com",
    messagingSenderId: "1095017924401",
    appId: "1:1095017924401:web:8f7b7a0c2b4e6e3f6d4c1f",
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const user = useUser();

  const uploadImage = async () => {
    const response = await fetch(image!);
    const blob = await response.blob();
    const storageRef = ref(
      storage,
      `gs://sonderart-1be4d.firebasestorage.app/IMG_${user.user?.id}.jpeg`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          // Save the downloadURL to your database or do something with it
        });
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
        <Text style={styles.title}>Apply For Event</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={"#640000"}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"#640000"}
        />
        <TextInput
          multiline={true}
          style={styles.textArea}
          placeholder="Tell us more about your artwork..."
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"#640000"}
        />
        <TouchableOpacity style={styles.searchBar} onPress={pickImage}>
          <IconSymbol
            style={{ alignSelf: "center" }}
            name="photo"
            size={56}
            color="#460000"
          />
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}
            style={styles.buttons}
          >
            <Text style={{ color: "#460000", fontSize: 32 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => {
              uploadImage().finally(() => {
                props.onClose();
              });
            }}
          >
            <Text style={{ color: "#460000", fontSize: 32 }}>Upload</Text>
          </TouchableOpacity>
        </View>
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
