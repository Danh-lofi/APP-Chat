import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  BackIcon,
  BlockIcon,
  NotificationIcon,
  PersonalIcon,
  SearchICon,
} from "../components/IconBottomTabs";

const { width } = Dimensions.get("window");
const size = 22;

export const InformationFriendChat = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={[styles.icon, { flexDirection: "row" }]}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color="white" size={size} />
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
            Quay lại
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.informationMain}>
        <View style={styles.wrapAvatar_Name_Bio}>
          <Image
            source={require("../assets/cute.png")}
            style={[
              styles.image,
              {
                width: 120,
                height: 120,
                borderRadius: 120,
                borderWidth: 4,
              },
            ]}
            resizeMode={"stretch"}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Name</Text>
            <Text>Bio</Text>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",

                width: "20%",
              }}
            >
              <SearchICon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Tìm tin nhắn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",

                width: "20%",
              }}
            >
              <PersonalIcon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Trang cá nhân</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",

                width: "20%",
              }}
            >
              <NotificationIcon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Tắt thông báo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
              }}
            >
              <BlockIcon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Chặn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.content}>
        {/* img da gui */}
        <View style={styles.listImg}>
          <Text style={styles.textXXX}>Hình ảnh</Text>
          <View style={styles.wrapImg}>
            <Image
              source={require("../assets/cute.png")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </View>
        {/* file da gui */}
        <View>
          <Text style={styles.textXXX}>File</Text>
        </View>
      </ScrollView>
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

  informationMain: {
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    borderBottomWidth: 1,
  },

  wrapAvatar_Name_Bio: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  image: {
    // width,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 24,
  },

  textXXX: {
    fontSize: 20,
    color: "#000",
    fontWeight: "500",
    marginBottom: 10,
  },

  wrapImg: {
    height: 80,
    width: 80,
    borderWidth: 1,
    marginLeft: 10,
  },

  listImg: {
    marginBottom: 20,
  },
});
