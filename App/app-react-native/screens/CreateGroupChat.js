import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { BackIcon, XIcon } from "../components/IconBottomTabs";

const size = 22;

export const CreateGroupChat = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={[styles.icon, { flexDirection: "row" }]}
          onPress={() => navigation.goBack()}
        >
          <XIcon color="white" size={size} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#fff",
              marginLeft: 15,
            }}
          >
            Huỷ
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {/* <View>
              <
            </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarChat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#4eac6dd4",
    paddingVertical: 5,
  },

  icon: {
    // width: "10%",
    padding: 10,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
