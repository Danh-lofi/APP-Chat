import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  FlatList,
  Alert,
} from "react-native";
import { BackIcon, SearchICon, XIcon } from "../components/IconBottomTabs";
import { TabView, SceneMap } from "react-native-tab-view";
import SearchFriendBar from "../components/SearchFriendBar";
import socket from "../utils/socket";
import ApiLoadFriend from "../api/ApiLoadFriend";
import ApiLoadGroupChat from "../api/LoadGroupChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../components/GlobalStyles";

const size = 22;

export const CreateGroupChat = ({ navigation }) => {
  const [nameGroup, setNameGroup] = useState();
  const [valueSearch, setValueSearch] = useState("");
  const [infor, setInfor] = useState([]);
  let aMembers = [];

  const getFriend = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    await ApiLoadFriend.getFriend(token)
      .then((res) => {
        console.log("get friend 2");
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
  }, []);

  useEffect(() => {
    getFriend();
  }, []);

  const handleCreateRoom = async () => {
    const id = await AsyncStorage.getItem("idUser");
    const token = await AsyncStorage.getItem("token");
    aMembers.unshift({ id: id });
    const data = {
      nameGroupChat: nameGroup,
      memberChat: aMembers,
    };

    if (aMembers.length < 3) {
      Alert.alert("So luong thanh vien phai lon hon 2");
    } else {
      try {
        await ApiLoadGroupChat.createGroup(token, data).then(async (res) => {
          console.log("tao group thanh cong");
          const arr = [];
          const idAdmin = res.data.adminGroup;
          const group = res.data;
          // tao group
          // socket.emit("send-notication-group", {
          //   listIdUser: res.data.memberChat,
          //   group,
          // });
          aMembers = [];
          Alert.alert("Tao group thanh cong");
        });
      } catch (error) {
        console.log("Khong tao duoc group: " + error);
      }
    }
  };

  const handleClick = (item) => {
    aMembers.push({
      id: item._id,
    });
    console.log("aMembers");
    console.log(aMembers);
  };

  const cancel = () => {
    aMembers = [];
    navigation.goBack();
  };

  const ListFriend = () => (
    <View style={{ flex: 1, backgroundColor: "#fff", marginBottom: 150 }}>
      <View
        style={{
          // marginTop: 20,
          marginRight: 20,
        }}
      >
        <FlatList
          data={infor}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <SearchFriendBar
              onPress={() => handleClick(item)}
              listInfor={item}
            />
          )}
        />
      </View>
    </View>
  );

  const PhoneBook = () => (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>Danh ba</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: ListFriend,
    second: PhoneBook,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Bạn bè" },
    { key: "second", title: "Danh bạ" },
  ]);

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={[styles.icon, { flexDirection: "row" }]}
          onPress={cancel}
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
        <TouchableOpacity
          style={[styles.icon, { flexDirection: "row" }]}
          onPress={handleCreateRoom}
        >
          <Image source={require("../assets/checked.png")} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#fff",
              marginLeft: 15,
            }}
          >
            Tạo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#ccc",
              padding: 24,
              borderRadius: 200,
              justifyContent: "center",
              alignItems: "center",
              width: 64,
              height: 64,
              borderWidth: 2,
              marginRight: 20,
            }}
          >
            <Image
              source={require("../assets/camera.png")}
              style={[
                styles.image,
                {
                  // width: 50,
                  // height: 50,
                  // borderRadius: 120,
                  // borderWidth: 4,
                },
              ]}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.inputBorderBottom}
            placeholder="Tên Group"
            value={nameGroup}
            onChangeText={setNameGroup}
          />
        </View>

        {/* search */}
        <View
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            paddingLeft: 10,
            width: "100%",
            borderColor: "#ccc",
            borderWidth: 1,
            marginTop: 24,
          }}
        >
          <SearchICon color="#000" size={22} />
          <TextInput
            value={valueSearch}
            onChangeText={(obj) => setValueSearch(obj)}
            placeholder="Tìm tên hoặc số điện thoại"
            placeholderTextColor="#939995"
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#000",
              padding: 12,
              width: "80%",
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 5,
          backgroundColor: "#ccc",
          padding: 0,
        }}
      ></View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ marginTop: 5, flex: 1, backgroundColor: "red" }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBarChat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  image: {
    // width,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: 24,
  },

  inputBorderBottom: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    padding: 10,
    width: "60%",
  },
});
