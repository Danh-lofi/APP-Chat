import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  BirthDateIcon,
  AddNewIcon,
  GenderIcon,
  AddressIcon,
  UpdateProfileIcon,
  OptionIcon,
} from "../components/IconBottomTabs";

const { width } = Dimensions.get("window");
const size = 24;

export const Personal = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.replace("SC_Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.wrapImage}>
          <View style={styles.coverImage}>
            <Image
              style={styles.image}
              source={require("../assets/coverimg.jpeg")}
              resizeMode={"stretch"}
            />
            <View style={styles.option}>
              <TouchableOpacity style={styles.btnOption}>
                <OptionIcon color="black" size={40} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.avatarProfile}>
            <Image
              style={[
                styles.image,
                {
                  width: 120,
                  height: 120,
                  borderRadius: 120,
                  borderWidth: 4,
                },
              ]}
              source={require("../assets/avatar.jpg")}
              resizeMode={"contain"}
            />
          </View>
        </View>
        <View style={styles.inforProfile}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              position: "absolute",
              top: 70,
            }}
          >
            Đạt vina mobiphone
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              position: "absolute",
              top: 105,
            }}
          >
            400 củ đâu rồi
          </Text>
        </View>
      </View>
      <ScrollView style={styles.profileContent}>
        <View style={styles.warpContent}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {" "}
            Thông tin cá nhân{" "}
          </Text>
          <View style={styles.wrapInformationPerson}>
            <View style={styles.xxxHi}>
              <BirthDateIcon color="black" size={size} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                }}
              >
                01/05/2001
              </Text>
            </View>
            <View style={styles.xxxHi}>
              <GenderIcon color="black" size={26} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                }}
              >
                Nam
              </Text>
            </View>
            <View style={styles.xxxHi}>
              <AddressIcon color="black" size={26} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                }}
              >
                Tuy An, Phú Yên, Việt Nam
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.wrapUpdateProfile}>
          <View style={styles.updateProfile}>
            <TouchableOpacity style={styles.btnUpdateProfile}>
              <UpdateProfileIcon color="black" size={26} />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                }}
              >
                Cập nhật thông tin các nhân
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileHeader: {
    flex: 1,
    // backgroundColor: "red",
    flexGrow: 5,
  },

  profileContent: {
    flex: 1,
    // borderTopColor: "black",
    // borderWidth: 2,
    borderTopWidth: 1,
    borderColor: "#b0aeae",
    // backgroundColor: "blue",
    flexGrow: 5,
    // justifyContent: "flex-end",
    marginTop: 100,
  },

  wrapImage: {
    flex: 1,
    flexGrow: 8,
  },

  inforProfile: {
    flex: 1,
    flexGrow: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  coverImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  avatarProfile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    top: "73%",
    left: "35%",
    position: "absolute",
  },

  image: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  warpContent: {
    flex: 1,
    padding: 24,
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

  xxxHi: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    padding: 10,
    // borderBottomWidth: 0.5,
  },

  wrapUpdateProfile: {
    flex: 1,
    // padding: 24,
    justifyContent: "flex-start",
  },

  updateProfile: {
    justifyContent: "center",
    alignItems: "center",
  },

  btnUpdateProfile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  option: {
    position: "absolute",
    top: 70,
    right: 20,
  },

  btnOption: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
    backgroundColor: "#e3e3e3",
    // padding: 5,
    paddingTop: 10,
    paddingLeft: 10,
    borderRadius: 100,
  },
});
