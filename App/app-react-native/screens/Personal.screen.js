import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Personal = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.replace("SC_Login");
  };

  return (
    <View style={styles.container}>
      <Text>Personal</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.textButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 25,
  },
  textButton: {
    color: "white",
    fontWeight: "700",
  },
});
