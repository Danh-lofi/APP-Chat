import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
import { BackIcon, PhoneIcon, VideoIcon } from "../components/IconBottomTabs";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiProfile, ApiUser } from "../api/ApiUser";
import { chatApi } from "../api/ApiChat";
import { messageApi } from "../api/ApiMessage";
import axios from "axios";
import MessageComponent from "../components/MessageComponent";

import socket from "../utils/socket";

const size = 24;

const SC_Chat = (navigation, route) => {
  const [currentName, setCurrentName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [idUser, setIdUser] = useState("");
  const [idFriend, setIdFriend] = useState("");
  const [chatId, setChatId] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getId = useCallback(async () => {
    setIdUser(await AsyncStorage.getItem("idUser"));
    setIdFriend(await AsyncStorage.getItem("idFriend"));
    setCurrentName(await AsyncStorage.getItem("currentName"));
    setAvatar(await AsyncStorage.getItem("avatar"));
  }, []);

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    console.log("--+++");
    console.log(idUser);
    socket.emit("new-user-add", idUser);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [idUser]);

  useEffect(() => {
    socket;
  }, [socket]);

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  const handleNewMessage = async () => {
    const messageSender = {
      chatId,
      senderId: idUser,
      text: message,
    };

    const data = await messageApi.addMessage(messageSender);
    console.log("200----------");

    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    const time = `${hour}:${mins}`;

    if (data.status === 200) {
      console.log("--------200----------");
      if (message !== null) {
        socket.emit("send-message", {
          chatId,
          senderId: idUser,
          text: message,
          receiverId: idFriend,
          time,
        });
      }

      setChatMessages((chatMessages) => [
        ...chatMessages,
        { ...messageSender, time },
      ]);
      setMessage("");
    }

    setMessage("");

    console.log({
      message,
      idUser,
      timestamp: { hour, mins },
    });
  };

  // get id room chat
  useEffect(() => {
    const idRoomChat = async () => {
      const roomChat = await chatApi.getChat(idUser, idFriend);
      console.log("id room chat: ");
      console.log(roomChat.data);
      setChatId(roomChat.data._id);
    };
    idRoomChat();
  }, [idUser, idFriend]);

  // get all messages from chat id
  useEffect(() => {
    const getAllMessages = async (chatId) => {
      if (!chatId) {
        setChatId(null);
        return;
      }
      const messagesData = await messageApi.getMessages(chatId);
      console.log("message: ");
      console.log(messagesData.data);
      setChatMessages(messagesData.data);
    };
    getAllMessages(chatId);
  }, [chatId]);

  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      console.log("data");
      console.log(data);
      setChatMessages((chatMessages) => [...chatMessages, data]);
    });
  }, [socket]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={styles.icon}
          // onPress={() => navigation.replace("BottomTabsNavigator")}
        >
          <BackIcon color="white" size={size} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.aMess_avt}>
          <Image source={{ uri: avatar }} style={styles.wrapAvatarZL} />
          <View style={styles.wrapNameAndStatus}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}>
              {currentName}
            </Text>
            <Text>Dang hoat dong</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.wrapIconPhoneVideoCall}>
          <TouchableOpacity style={[styles.icon]}>
            <PhoneIcon color="white" size={size} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.icon, { marginLeft: 5 }]}>
            <VideoIcon color="white" size={size} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentChat}>
        {/* <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        /> */}
        <View style={styles.messagingscreen}>
          <View
            style={[
              styles.messagingscreen,
              { paddingVertical: 15, paddingHorizontal: 10 },
            ]}
          >
            {chatMessages[0] ? (
              <FlatList
                data={chatMessages}
                renderItem={({ item }) => (
                  <MessageComponent item={item} idUser={idUser} />
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              ""
            )}
          </View>

          <View style={styles.messaginginputContainer}>
            <TextInput
              style={styles.messaginginput}
              onChangeText={(value) => setMessage(value)}
            />
            <TouchableOpacity
              style={styles.messagingbuttonContainer}
              onPress={handleNewMessage}
            >
              <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: "10%",
    padding: 10,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },

  aMess_avt: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "65%",
    // justifyContent: "center",
    // flexGrow: 1,
  },

  wrapAvatarZL: {
    width: 50,
    height: 50,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "black",
    // marginVertical: 10,
  },

  wrapNameAndStatus: {
    marginLeft: 10,
    marginRight: 40,
  },

  wrapIconPhoneVideoCall: {
    position: "absolute",
    right: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  contentChat: {
    flex: 1,
    marginTop: 1,
  },

  // new
  messagingscreen: {
    flex: 1,
  },

  messaginginputContainer: {
    width: "100%",
    // minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },

  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default SC_Chat;
