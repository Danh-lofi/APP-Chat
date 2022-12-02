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

const MemberChat = ({ members, admin, user }) => {
  console.log("members");
  console.log(members.avatar);
  const [position, setPosition] = useState();
  useEffect(() => {
    const setPos = () => {
      if (admin === members._id) {
        setPosition("Trưởng nhóm");
      } else {
        setPosition("Thành viên");
      }
    };

    setPos();
  }, [members]);
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
          <Image source={{ uri: members.avatar }} style={styles.wrapAvatarZL} />
        </View>
        <View style={styles.aMess_right}>
          <View style={styles.name_and_disMess}>
            <Text numberOfLines={1} style={styles.txtNameMess}>
              {members.name}
            </Text>
            <Text>{position}</Text>
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
        {user === admin ? (
          <TouchableOpacity style={styles.xxxDiff}>
            <XIcon color="#000" size={22} />
          </TouchableOpacity>
        ) : (
          ""
        )}
        {/* <TouchableOpacity style={styles.xxxDiff}>
          <Image source={require("../assets/add-user.png")} />
        </TouchableOpacity> */}
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

export default MemberChat;
