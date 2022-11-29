import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { SearchICon, QRIcon, AddNewIcon } from "../components/IconBottomTabs";
import MessageBar from "../components/MessageBar";
import GroupBar from "../components/GroupBar";
import { PhoneBook } from "./PhoneBook.screen";
import { ApiProfile, ApiUser } from "../api/ApiUser";
import ApiLoadFriend from "../api/ApiLoadFriend";
import ApiLoadGroupChat from "../api/LoadGroupChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateGroupChat from "../components/CreateGroupChat2";
import socket from "../utils/socket";
import Modal from "react-native-modal";

const size = 22;

// test Touch text search
function alert(item) {
  Alert.alert(item.name);
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export const Home = ({ navigation, route }) => {
  const [infor, setInfor] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const { token } = route.params;
  const [temp, setTemp] = useState("");
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  let temp1 = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  console.log(
    "------------------------------------------------------------------"
  );

  const handleCreateGroupChat = () => setVisible(true);

  const handleClick = async (item) => {
    navigation.navigate("SC_Chat", { statusG: 0 });
    // await AsyncStorage.setItem("statusG", "0");
    await AsyncStorage.setItem("idUser", user._id);
    await AsyncStorage.setItem("idFriend", item._id);
    await AsyncStorage.setItem("currentName", item.name);
    await AsyncStorage.setItem("avatar", item.avatar);
  };

  const handleClick2 = async (item) => {
    navigation.navigate("SC_Chat", { statusG: 1 });
    await AsyncStorage.setItem("idUser", user._id);
    await AsyncStorage.setItem("idFriend", item._id);
    await AsyncStorage.setItem("currentName", item.nameGroupChat);
    await AsyncStorage.setItem("avatar", item.imgGroupChat);
    await AsyncStorage.setItem("idGroupChat", item._id);
    await AsyncStorage.setItem("adminGroup", item.adminGroup);
  };

  const callApiProfile = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    setTemp(token);

    await ApiProfile.profile2(token)
      .then((res) => {
        console.log("2: " + token);
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("3");
      });
  }, []);

  useEffect(() => {
    callApiProfile();
  }, []);

  const getFriend = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    await ApiLoadFriend.getFriend(token)
      .then((res) => {
        console.log("get friend");
        console.log(res.data.listFriend);
        setInfor(
          res.data.listFriend.filter((element) => {
            return element !== null;
          })
        );
      })
      .catch((err) => {
        console.log("405");
      });

    await ApiLoadGroupChat.getGroupChat(token)
      .then((res) => {
        console.log("get group chat");
        const ff = res.data.listGroup.filter((element) => {
          return element !== null;
        });
        console.log(ff);
        setListGroup(
          res.data.listGroup.filter((element) => {
            return element !== null;
          })
        );
      })
      .catch((err) => {
        console.log("406: " + err);
      });
  }, []);

  useEffect(() => {
    getFriend();
  }, []);

  function test1() {
    Alert.alert(temp);
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  });

  useEffect(() => {
    console.log("SOCKET GROUP HOAT DONG");
    socket.on("receive-notication-group", (group) => {
      setListGroup((listGroup) => [
        ...listGroup,
        {
          _id: group._id,
          nameGroupChat: group.nameGroupChat,
          adminGroup: group.adminGroup,
          memberChat: group.memberChat,
          imgGroupChat: group.imgGroupChat,
        },
      ]);
      console.log("socket group: ");
      console.log(group);
    });
  }, [socket]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openCreateGroup = () => {
    navigation.navigate("CreateGroupChat");
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
      <View style={styles.tabBarSearch}>
        <TouchableOpacity style={styles.icon}>
          <SearchICon color="white" size={size} />
        </TouchableOpacity>
        <Pressable style={styles.wrapTextSearch} onPress={test1}>
          <Text style={styles.txtSearch}>Tìm kiếm</Text>
        </Pressable>
        <TouchableOpacity style={styles.icon}>
          {/* <QRIcon color="white" size={size} /> */}
          {/* <Image source={require("../assets/bell1.png")} /> */}
          <Image source={require("../assets/bell.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={toggleModal}>
          <AddNewIcon color="white" size={size} />
        </TouchableOpacity>
      </View>

      {/* list message */}
      <View style={styles.listMess}>
        <FlatList
          data={infor}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessageBar onPress={() => handleClick(item)} listInfor={item} />
          )}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     onRefresh={handleRefresh}
          //   />
          // }
        />
      </View>
      <View style={styles.listMess}>
        <FlatList
          data={listGroup}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <GroupBar onPress={() => handleClick2(item)} listInfor={item} />
          )}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     onRefresh={handleRefresh}
          //   />
          // }
        />
      </View>
      {visible ? <CreateGroupChat setVisible={setVisible} /> : ""}
      {/* modal */}
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginTop: 100,
          }}
        >
          <View
            style={{
              width: 200,
              height: 120,
              backgroundColor: "#fff",
              padding: 12,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "red",
                paddingVertical: 5,
                borderBottomWidth: 1,
              }}
              onPress={openCreateGroup}
            >
              <Image source={require("../assets/people.png")} />
              <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 15 }}>
                Tạo Group
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "red",
                paddingVertical: 5,
                borderBottomWidth: 1,
                marginTop: 5,
              }}
            >
              <Image source={require("../assets/add-user.png")} />
              <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 15 }}>
                Thêm bạn
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // begin search
  tabBarSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#69b4f5",
  },

  icon: {
    width: "10%",
    padding: 10,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },

  wrapTextSearch: {
    width: "68%",
    padding: 10,
    // backgroundColor: 'black',
  },

  txtSearch: {
    fontSize: 16,
    color: "white",
    opacity: 0.5,
  },
  // end search

  // begin list message
  listMess: {
    flex: 1,
    marginVertical: 2,
  },
});
