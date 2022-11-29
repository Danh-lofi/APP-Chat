import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Platform,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export const PhoneBook = () => {
  const [image, setImage] = useState(null);

  const chooseImg = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (rs.cancelled === true) {
      console.log("Huy img");
    } else {
      console.log("Chon anh");
      console.log(rs.fileName);
    }

    console.log(rs);
    // console.log(rs.base64);
    console.log(rs.uri);
    setImage(rs.uri);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>...</Text>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={chooseImg}
      >
        <Text>Choose Image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
