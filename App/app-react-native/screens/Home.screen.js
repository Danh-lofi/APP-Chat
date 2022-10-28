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
import { ApiProfile } from "../api/ApiUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const size = 22;

const avt = require("../assets/cute.png");
const url = "http://localhost:3000/posts";

const DATA = [
  { id: "1", name: "Nguyen Thanh Nhan", avatar: require("../data/img/1.jpeg") },
  { id: "2", name: "Nguyen Van A", avatar: require("../data/img/2.png") },
  { id: "3", name: "Tran Thi B", avatar: require("../data/img/3.jpeg") },
  { id: "4", name: "Phan Van C", avatar: require("../data/img/4.png") },
  { id: "5", name: "Pham Thi D", avatar: require("../data/img/5.jpeg") },
];

// test Touch text search
function alert(item) {
  Alert.alert(item.name);
}

export const Home = ({ navigation, route }) => {
  const [infor, setInfor] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const { token } = route.params;
  const [temp, setTemp] = useState("");

  const callApiProfile = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    setTemp(token);

    await ApiProfile.profile2(token)
      .then((res) => {
        console.log("2: " + token);
        console.log("Thong tin user:" + res.data.name);
      })
      .catch((err) => {
        console.log("3");
      });
  }, []);

  useEffect(() => {
    callApiProfile();
  }, []);

  function test1() {
    Alert.alert(temp);
  }

  const handleFetchPalettes = useCallback(async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInfor(data);
      })
      .catch((error) => {
        // Alert.alert(console.error(error));
      });
  }, []);

  useEffect(() => {
    handleFetchPalettes();
  }, []);

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
        <TouchableOpacity style={styles.icon}>
          <AddNewIcon color="white" size={size} />
        </TouchableOpacity>
      </View>

      {/* list message */}
      <View style={styles.listMess}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBar onPress={() => alert(item)} listInfor={item} />
          )}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isRefreshing}
          //     onRefresh={handleRefresh}
          //   />
          // }
        />
      </View>
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
