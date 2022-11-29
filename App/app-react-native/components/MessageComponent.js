import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cos, min } from "react-native-reanimated";
import { ApiGetUser } from "../api/ApiUser";

export default function MessageComponent({ item, idUser, onPress, statusG }) {
  console.log("item");
  console.log(item);
  const { _id, chatId, senderId, fileName, isImg, type, text } = item;
  const status = item.senderId !== idUser;
  const [statusTouch, setStatusTouch] = useState(false);
  const [disTime, setDisTime] = useState("");
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();

  const getAvatar = async () => {
    console.log(statusG);
    if (item.senderId === "") {
      console.log("id null");
    } else {
      if (status) {
        const data = await ApiGetUser.getProfileUserFromId(item.senderId);
        if (data.data === null) {
          console.log("Khong lay duoc du lieu");
        } else {
          setAvatar(data.data.avatar);
          setName(data.data.name);
        }
      }
    }
  };

  useEffect(() => {
    getAvatar();
  }, [item.chatId]);

  const touchMess = () => {
    console.log(item);

    if (statusTouch === true) {
      setStatusTouch(false);
      clearInterval();
    } else {
      if (item.time === undefined) {
        setStatusTouch(true);
        console.log("item.createdAt");
        console.log(item.createdAt);
        const date = new Date(item.createdAt);
        console.log(date.getDate());
        let day = date.getDate() - 1;
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        console.log(typeof day);
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (day < 10) {
          day = "0" + day;
        }
        if (month < 10) {
          month = "0" + month;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }

        setDisTime(
          "Ngày " + day + "-" + month + "-" + year + ", " + hour + ":" + minute
        );
        const timeOut = setTimeout(() => {
          setStatusTouch(false);
          console.log("5 giay");
        }, 5000);

        return () => {
          clearTimeout(timeOut);
        };
      } else {
        setStatusTouch(false);
      }
    }
  };

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        {status && statusG === 1 ? <Text>{name}</Text> : ""}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {status ? (
            <Image
              source={{ uri: avatar }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
          ) : (
            ""
          )}

          <Pressable
            style={
              status
                ? [
                    styles.mmessage,
                    isImg
                      ? {
                          backgroundColor: "rgba(255,255,255,0)",
                          marginRight: 0,
                        }
                      : styles.mmessage,
                  ]
                : [
                    styles.mmessage,
                    !isImg
                      ? {
                          backgroundColor: "rgb(194, 243, 194)",
                          marginRight: 0,
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0)",
                          marginRight: 0,
                        },
                  ]
            }
            onPress={touchMess}
          >
            {isImg ? (
              <View style={{ height: 200, width: 100 }}>
                <Image
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                  }}
                  source={{ uri: text }}
                  resizeMode={"contain"}
                />
              </View>
            ) : (
              <Text>{item.text}</Text>
            )}
          </Pressable>
        </View>
        {statusTouch === true ? (
          <Text style={{ marginLeft: 40 }}>{disTime}</Text>
        ) : (
          <Text style={{ marginLeft: 40 }}>{item.time}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: "50%",
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
});
