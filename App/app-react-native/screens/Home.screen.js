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
import AsyncStorage from "@react-native-async-storage/async-storage";

const size = 22;

// test Touch text search
function alert(item) {
  Alert.alert(item.name);
}

export const Home = ({ navigation, route }) => {
  const [infor, setInfor] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const { token } = route.params;
  const [temp, setTemp] = useState("");

  console.log(
    "------------------------------------------------------------------"
  );

  const handleClick = async (item) => {
    navigation.navigate("SC_Chat");
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
      })
      .catch((err) => {
        console.log("3");
      });
  }, []);

  useEffect(() => {
    callApiProfile();
  }, []);

  const getAllUser = useCallback(async () => {
    await ApiUser.getAllUser()
      .then((res) => {
        console.log(res.data.users);
        setInfor(res.data.users);
      })
      .catch((err) => {
        console.log("Khong the lay tat ca thong tin user: " + err);
      });
  }, []);

  useEffect(() => {
    getAllUser();
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
        <TouchableOpacity style={styles.icon}>
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
