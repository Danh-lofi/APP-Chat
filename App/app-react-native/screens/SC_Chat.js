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
import {
  BackIcon,
  PhoneIcon,
  VideoIcon,
  OptionIcon,
  SendIcon,
  ImgIcon,
  FileIcon,
} from "../components/IconBottomTabs";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiProfile, ApiUser } from "../api/ApiUser";
import { chatApi } from "../api/ApiChat";
import { messageApi } from "../api/ApiMessage";
import cloudinaryApi from "../api/cloudinaryApi";
import axios from "axios";
import MessageComponent from "../components/MessageComponent";
import ModalMemberGroupChat from "../components/ModalMemberGroupChat";
import socket from "../utils/socket";
import * as ImagePicker from "expo-image-picker";

const size = 24;

const SC_Chat = ({ navigation, route }) => {
  const [currentName, setCurrentName] = useState("");
  const [avatar, setAvatar] = useState();
  const [idUser, setIdUser] = useState("");
  const [idFriend, setIdFriend] = useState("");
  const [chatId, setChatId] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusInputMess, setStatusInputMess] = useState(false);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState("");
  const [groupChatId, setGroupChatId] = useState("");
  const { statusG } = route.params;
  const [wellCome, setWellCome] = useState("");
  const [sttWell, setSttWell] = useState();

  const handleOpenMemberChat = () => setVisible(true);

  const getId = async () => {
    // console.log("1");
    setGroupChatId(await AsyncStorage.getItem("idGroupChat"));
    setToken(await AsyncStorage.getItem("token"));
    setCurrentName(await AsyncStorage.getItem("currentName"));
    setAvatar(await AsyncStorage.getItem("avatar"));
    setIdFriend(await AsyncStorage.getItem("idFriend"));
    setIdUser(await AsyncStorage.getItem("idUser"));

    //console.log(await AsyncStorage.getItem("token"));

    // console.log("groupChatId");
    // console.log(await AsyncStorage.getItem("idFriend"));
  };

  useEffect(() => {
    // console.log("1.1");
    getId();
  }, [idFriend]);

  useEffect(() => {
    // console.log("2");
    // console.log("--+++");
    // console.log(idUser);
    socket.emit("new-user-add", idUser);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [idUser]);

  // useEffect(() => {
  //   socket;
  // }, [socket]);

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

      // setChatMessages((chatMessages) => [
      //   ...chatMessages,
      //   { ...messageSender, time },
      // ]);
      setMessage("");
    }

    setMessage("");

    console.log({
      message,
      idUser,
      timestamp: { hour, mins },
    });
  };

  const chooseImg = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (rs.cancelled === false) {
      // console.log(rs);
      // console.log(rs.uri);
      const name = rs.uri;
      const lastDot = name.lastIndexOf(".");

      const fileName = name.substring(0, lastDot);
      const type = name.substring(lastDot + 1).toLowerCase();

      const isImg =
        type == "png" || type == "jpg" || type == "JPG" || type == "PNG"
          ? true
          : false;
      const isFile =
        type == "docx" || type == "ptxx" || type == "pdf" ? true : false;

      const messageSender = {
        chatId,
        senderId: idUser,
        text: message,
        isImg,
        isFile,
      };

      const test = name.substring(name.lastIndexOf(":") + 4);

      // console.log(test);

      const dataImg = {
        data: rs.base64,
        token: token,
        chatId: chatId,
        type: type,
        fileName: fileName,
      };

      // const data = await cloudinaryApi.cloudinaryUpload(
      //   rs,
      //   token,
      //   chatId,
      //   type,
      //   fileName
      // );

      const data = await cloudinaryApi.upLoad(dataImg);

      if (data.status === 200) {
        // console.log(data);
        // console.log(messageSender);
        console.log("thanh cong");
      } else {
        console.log("upload khong thanh cong");
      }
    }

    // console.log(rs.base64);
    // setImage(rs.base64);
  };

  const handleNewImg = async () => {};

  const handleNewFile = async () => {};

  // get id room chat
  useEffect(() => {
    if (idUser === "" || idFriend === "") {
      console.log("khong thuc hien");
    } else {
      const idRoomChat = async () => {
        // const roomChat = await chatApi.getChat(idUser, idFriend);
        // setChatId(roomChat.data._id);
        await chatApi
          .getChat(idUser, idFriend)
          .then((res) => {
            console.log("khong null");
            setChatId(res.data._id);
            setWellCome("");
            setSttWell(true);
          })
          .catch((err) => {
            console.log("null");
            setWellCome("Các bạn hiện chưa kết nối với nhau!");
            setSttWell(false);
          });
      };

      const getGroupChat = async () => {
        setSttWell(true);
        setChatId(await AsyncStorage.getItem("idFriend"));
      };

      //idRoomChat();
      if (statusG === 0) {
        idRoomChat();
      } else {
        getGroupChat();
      }
    }

    // console.log("=======");
    // console.log(chatId);
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
      // console.log(messagesData.data);
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

  const touchMess = (item) => {
    console.log(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color="white" size={size} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.aMess_avt}
          onPress={() => navigation.navigate("InformationFriendChat")}
        >
          <Image source={{ uri: avatar }} style={styles.wrapAvatarZL} />
          <View style={styles.wrapNameAndStatus}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 16, fontWeight: "600", marginBottom: 5 }}
            >
              {currentName}
            </Text>
            <Text>Dang hoat dong</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.wrapIconPhoneVideoCall}>
          <TouchableOpacity style={[styles.icon, { paddingHorizontal: 15 }]}>
            <PhoneIcon color="white" size={size} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, { marginLeft: 10, paddingHorizontal: 15 }]}
          >
            <VideoIcon color="white" size={size} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.icon,
              {
                marginLeft: 10,
                paddingHorizontal: 15,
              },
            ]}
            onPress={handleOpenMemberChat}
          >
            <OptionIcon color="white" size={size} />
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
        <View style={styles.messagingScreen}>
          <View
            style={[
              styles.messagingScreen,
              { paddingVertical: 15, paddingHorizontal: 10 },
            ]}
          >
            {chatMessages[0] ? (
              <FlatList
                data={chatMessages}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <MessageComponent
                    item={item}
                    idUser={idUser}
                    onPress={() => touchMess(item)}
                  />
                )}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: "50%",
                }}
              >
                {sttWell ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: "#949494",
                    }}
                  >
                    Hãy bắt đầu trò truyện với nhau đi nào!
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: "#949494",
                    }}
                  >
                    Các bạn hiện giờ chưa kết nối với nhau! Hãy kết bạn với nhau
                    đi nào!
                  </Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.messagingScreenContainer}>
            {sttWell ? (
              <TextInput
                style={styles.messagingInput}
                value={message}
                onChangeText={(value) => setMessage(value)}
                placeholder="Nhập tin nhắn!"
              />
            ) : (
              <TextInput
                style={[styles.messagingInput, { backgroundColor: "#949494" }]}
                value={message}
                onChangeText={(value) => setMessage(value)}
                placeholder="Nhập tin nhắn!"
                editable={false}
                selectTextOnFocus={false}
              />
            )}

            {message !== "" ? (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
                onPress={handleNewMessage}
              >
                <SendIcon color="#4eac6dd4" size={40} />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleNewFile}
                >
                  <FileIcon color="#4eac6dd4" size={40} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                  onPress={chooseImg}
                >
                  <ImgIcon color="#4eac6dd4" size={40} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      {visible ? <ModalMemberGroupChat setVisible={setVisible} /> : ""}
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
    maxWidth: "60%",
  },

  wrapIconPhoneVideoCall: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: "red",
  },

  contentChat: {
    flex: 1,
    marginTop: 1,
  },

  // new
  messagingScreen: {
    flex: 1,
  },

  messagingScreenContainer: {
    width: "100%",
    // minHeight: 100,
    // backgroundColor: "white",
    // paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  messagingInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 10,
  },
  messagingButtonContainer: {
    // width: "30%",
    paddingHorizontal: 10,
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default SC_Chat;
