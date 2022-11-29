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
  Pressable,
} from "react-native";
import FileComponent from "../components/FileComponent";
import {
  AddNewIcon,
  BackIcon,
  BellIcon,
  BlockIcon,
  FileIcon,
  GeneralGroupIcon,
  LeaveGroup,
  ListMember,
  NextIcon,
  NotificationIcon,
  PersonalIcon,
  SearchICon,
} from "../components/IconBottomTabs";
import ImageComponent from "../components/ImageComponent";
import { ApiGetUser } from "../api/ApiUser";
import ApiLoadGroupChat from "../api/LoadGroupChat";
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

export const InformationGroupChat = ({ navigation, route }) => {
  console.log(route.params);
  const idGroup = route.params;
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [avatar, setAvatar] = useState();
  const [idUser, setIdUser] = useState();
  const [idAdmin, setIdAdmin] = useState();

  useEffect(() => {
    const getProfile = async () => {
      setIdUser(await AsyncStorage.getItem("idUser"));
      if (idGroup.idGroup === "") {
        console.log("id null");
      } else {
        const data = await ApiLoadGroupChat.getInforGroupChat(idGroup.idGroup);
        if (data.data === null) {
          console.log("Khong lay duoc du lieu");
        } else {
          setAvatar(data.data.imgGroupChat);
          setName(data.data.nameGroupChat);
          setIdAdmin(data.data.adminGroup);
          //   setBio(data.data.introducePersonal);
          console.log(data.data);
        }
      }
    };
    getProfile();
  }, []);

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
            <Pressable>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
                {name}
              </Text>
            </Pressable>
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
            {idAdmin === idUser ? (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  width: "20%",
                }}
              >
                <AddNewIcon color="#000" size={size} />
                <Text style={{ textAlign: "center" }}>Thêm thành viên</Text>
              </TouchableOpacity>
            ) : (
              ""
            )}

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
            >
              <LeaveGroup color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Rời nhóm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{ width: "100%", height: 5, backgroundColor: "#ccc" }}
      ></View>

      {/*  */}
      <View style={{ paddingHorizontal: 24, marginTop: 15 }}>
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
            {/* <ListMember color="#009EFF" size={50} /> */}
            <Image source={require("../assets/skill.png")} />
            <Text
              style={{
                fontSize: 18,
                color: "#000",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Danh sách thành viên
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
      </View>

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
    height: "30%",
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
