import React, { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { AddNewIcon, XIcon } from "./IconBottomTabs";
import friendApi from "../api/ApiRequestFriend";
import socket from "../utils/socket";

const FriendBar = ({ users, idUser }) => {
  const [sttCheckFriend, setSttCheckFriend] = useState();
  const [isRequired, setIsRequired] = useState();

  const requestFriendHandle = async () => {
    // Call API
    // gửi request senderId, receiverId
    const senderId = idUser;
    const receiverId = users._id;

    // Kiem tra kb

    //
    try {
      const data = await friendApi.requestFriend(senderId, receiverId);
      // console.log(data);
      console.log("idRequest");
      console.log(data.data.idRequest);
      //Gửi user và id user socket
      socket.emit("send-require-friend", {
        userFind: users,
        user: { ...users, idRequest: data.data.idRequest },
      });
      // Thông báo gửi thành công
      console.log("Gửi yêu cầu thành công");
      setIsRequired(true);
    } catch (error) {
      console.log(error);
    }
  };

  function checkFriend(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === idUser) {
        console.log(arr[i].name);
        return true;
      }
    }
    return false;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        borderColor: "#b6b9ba",
        borderBottomWidth: 1,
      }}
    >
      <View style={styles.aMess}>
        <View style={styles.aMess_avt}>
          <Image source={{ uri: users.avatar }} style={styles.wrapAvatarZL} />
        </View>
        <View style={styles.aMess_right}>
          <View style={styles.name_and_disMess}>
            <Text style={styles.txtNameMess}>{users.name}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checkFriend(users.friends) === true ? (
          ""
        ) : (
          <TouchableOpacity
            style={styles.xxxDiff}
            onPress={requestFriendHandle}
          >
            <Image source={require("../assets/add-user.png")} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aMess: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },

  aMess_avt: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },

  aMess_right: {
    flexDirection: "row",
    height: "100%",
    marginLeft: 5,
    width: "70%",
  },

  wrapAvatarZL: {
    width: 50,
    height: 50,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },

  name_and_disMess: {
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
  },

  txtNameMess: {
    fontSize: 16,
    fontWeight: "500",
  },

  txtDisMess: {
    fontSize: 15,
    opacity: 0.5,
  },

  xxxDiff: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },

  txtTimeMess: {
    textAlign: "center",
  },
});

export default FriendBar;
