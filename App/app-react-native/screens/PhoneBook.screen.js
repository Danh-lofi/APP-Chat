import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const PhoneBook = () => {
  return (
    <View style={styles.container}>
      <Text>PhoneBook</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
