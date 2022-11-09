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
} from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { SearchICon, QRIcon, AddNewIcon } from "../components/IconBottomTabs";
import MessageBar from "../components/MessageBar";
import { PhoneBook } from "./PhoneBook.screen";
import { ApiProfile, ApiUser } from "../api/ApiUser";
import ApiLoadFriend from "../api/ApiLoadFriend";
import ApiLoadGroupChat from "../api/LoadGroupChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateGroupChat from "../components/CreateGroupChat";
import socket from "../utils/socket";

const size = 22;

// test Touch text search
function alert(item) {
  Alert.alert(item.name);
}

export const Home = ({ navigation, route }) => {
  const [infor, setInfor] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const { token } = route.params;
  const [temp, setTemp] = useState("");
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  let temp1 = useState([]);

  console.log(
    "------------------------------------------------------------------"
  );

  const handleCreateGroupChat = () => setVisible(true);

  const handleClick = async (item) => {
    navigation.navigate("SC_Chat");
    await AsyncStorage.setItem("idUser", user._id);
    await AsyncStorage.setItem("idFriend", item._id);
    await AsyncStorage.setItem("currentName", item.name);
    await AsyncStorage.setItem("avatar", item.avatar);
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
        setInfor(res.data.listFriend);
      })
      .catch((err) => {
        console.log("405");
      });

    await ApiLoadGroupChat.getGroupChat(token)
      .then((res) => {
        console.log("get group chat");
        console.log(res.data.listGroup);
        setListGroup(res.data.listGroup);
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
          <QRIcon color="white" size={size} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleCreateGroupChat}>
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
      {visible ? <CreateGroupChat setVisible={setVisible} /> : ""}
      {/* <View>
        <Text>temp: {temp}</Text>
      </View> */}
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
