import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import FileComponent from "../components/FileComponent";
import {
  BackIcon,
  BellIcon,
  BlockIcon,
  FileIcon,
  GeneralGroupIcon,
  NextIcon,
  NotificationIcon,
  PersonalIcon,
  SearchICon,
} from "../components/IconBottomTabs";
import ImageComponent from "../components/ImageComponent";
import { ApiGetUser } from "../api/ApiUser";
import GlobalStyles from "../components/GlobalStyles";
import { TestGetFromHeroku } from "../api/ApiUser";
import ApiLoadFriend from "../api/ApiLoadFriend";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const size = 22;

const DATA = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export const InformationFriendChat = ({ navigation, route }) => {
  const idFriend = route.params;
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const getProfile = async () => {
      if (idFriend.idFriend === "") {
        console.log("id null");
      } else {
        const data = await ApiGetUser.getProfileUserFromId(idFriend.idFriend);
        const data2 = await TestGetFromHeroku.getTest(idFriend.idFriend);
        console.log(data2.data);
        if (data.data === null) {
          console.log("Khong lay duoc du lieu");
        } else {
          setAvatar(data.data.avatar);
          setName(data.data.name);
          setBio(data.data.introducePersonal);
        }
      }
    };
    getProfile();
  }, []);

  const handleDeleteFriend = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token + " " + idFriend.idFriend);
    if (idFriend.idFriend === "") {
      console.log("id null");
    } else {
      const deleteFriend = await ApiLoadFriend.deleteFriend(
        token,
        idFriend.idFriend
      );
      if (deleteFriend.status === 200) {
        Alert.alert("Xoa thanh cong");
        navigation.replace("BottomTabsNavigator");
      } else {
        console.log("Xoa Khong Thanh Cong!");
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
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
            source={{ uri: avatar }}
            style={[
              styles.image,
              {
                width: 100,
                height: 100,
                borderRadius: 120,
                borderWidth: 4,
              },
            ]}
            resizeMode={"stretch"}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>{name}</Text>
            <Text>{bio}</Text>
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
              <BellIcon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Tắt thông báo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
              }}
              onPress={() => handleDeleteFriend()}
            >
              <BlockIcon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Chặn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{ width: "100%", height: 5, backgroundColor: "#ccc" }}
      ></View>
      <View style={styles.content}>
        {/* img da gui */}
        <View style={styles.listImg}>
          <Text style={styles.textXXX}>Hình ảnh</Text>
          <FlatList
            data={DATA}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ImageComponent />}
          />
        </View>
        {/* file da gui */}

        <View style={{ flex: 1 }}>
          <Text style={styles.textXXX}>File</Text>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FileComponent />}
          />
        </View>
      </View>

      {/*  */}
      {/* <View style={{ paddingHorizontal: 24, marginTop: 15 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <GeneralGroupIcon color="#009EFF" size={50} />
            <Text
              style={{
                fontSize: 18,
                color: "#000",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Nhóm chung
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: "35%",
            }}
          >
            <NextIcon color="#000" size={50} />
          </View>
        </TouchableOpacity>
       
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
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
    height: "35%",
    // borderBottomWidth: 1,
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
    flex: 1,
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
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  wrapFile: {
    height: 50,
    width: 50,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  listImg: {
    marginBottom: 20,
    flex: 1,
  },
});
