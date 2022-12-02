import React, { useState, useCallback, useEffect, useRef } from "react";
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
import GlobalStyles from "../components/GlobalStyles";

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
  const messagesEndRef = useRef(null);

  // const handleOpenMemberChat = () => setVisible(true);

  const getId = async () => {
    setGroupChatId(await AsyncStorage.getItem("idGroupChat"));
    setToken(await AsyncStorage.getItem("token"));
    setCurrentName(await AsyncStorage.getItem("currentName"));
    setAvatar(await AsyncStorage.getItem("avatar"));
    setIdFriend(await AsyncStorage.getItem("idFriend"));
    setIdUser(await AsyncStorage.getItem("idUser"));
  };

  useEffect(() => {
    getId();
  }, [idFriend]);

  useEffect(() => {
    socket.emit("new-user-add", idUser);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [idUser]);

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
  };

  const chooseImg = async () => {
    let rs = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let uri = rs.uri;

    let fileExtension = uri.substring(uri.lastIndexOf(".") + 1);
    const isImg = rs.type == "image" ? true : false;
    const type = fileExtension;

    const base64Img = `data:image/jpg;base64,${rs.base64}`;
    const token = await AsyncStorage.getItem("token");
    const fileName = rs.uri.substring(
      rs.uri.lastIndexOf("/") + 1,
      rs.uri.length
    );

    if (rs.cancelled === false) {
      const data = await cloudinaryApi.cloudinaryUpload(
        base64Img,
        token,
        chatId,
        type,
        fileName
      );

      const hour =
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : `${new Date().getHours()}`;

      const mins =
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : `${new Date().getMinutes()}`;

      const time = `${hour}:${mins}`;
      const messageSender = {
        chatId,
        senderId: idUser,
        text: message,
        isImg,
      };
      if (data.status === 200) {
        socket.emit("send-message", {
          chatId,
          senderId: idUser,
          text: data.data.result.text,
          receiverId: idFriend,
          isImg,
          time,
        });
      }

      // setChatMessages((messages) => [
      //   ...messages,
      //   { ...messageSender, time, text: data.data.result.text },
      // ]);
      setMessage("");
    }
  };

  const handleNewImg = async () => {};

  const handleNewFile = async () => {};

  // get id room chat
  useEffect(() => {
    if (idUser === "" || idFriend === "") {
    } else {
      const idRoomChat = async () => {
        // const roomChat = await chatApi.getChat(idUser, idFriend);
        // setChatId(roomChat.data._id);
        await chatApi
          .getChat(idUser, idFriend)
          .then((res) => {
            setChatId(res.data._id);
            setWellCome("");
            setSttWell(true);
          })
          .catch((err) => {
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
  }, [idUser, idFriend]);

  // get all messages from chat id
  useEffect(() => {
    const getAllMessages = async (chatId) => {
      if (!chatId) {
        setChatId(null);
        return;
      }
      const messagesData = await messageApi.getMessages(chatId);

      setChatMessages(messagesData.data);
    };
    getAllMessages(chatId);
  }, [chatId]);

  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      console.log("---------------data--------------");
      console.log(data);
      setChatMessages((chatMessages) => [...chatMessages, data]);
    });
  }, [socket]);

  const touchMess = (item) => {};

  const informationChat = () => {
    if (statusG === 0) {
      navigation.navigate("InformationFriendChat", { idFriend: idFriend });
    } else {
      navigation.navigate("InformationGroupChat", { idGroup: chatId });
    }
  };

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color="white" size={size} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.aMess_avt}
          onPress={() => informationChat()}
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
            style={[
              styles.icon,
              { marginLeft: 10, paddingHorizontal: 15, marginRight: 20 },
            ]}
          >
            <VideoIcon color="white" size={size} />
          </TouchableOpacity>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
            <View style={{ alignItems: "center" }}>
              {statusG === 0 ? "" : <Text>Đã rời khỏi nhóm</Text>}
            </View>
            {chatMessages[0] ? (
              <FlatList
                data={chatMessages}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <MessageComponent
                    item={item}
                    idUser={idUser}
                    statusG={statusG}
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
      {/* {visible ? <ModalMemberGroupChat setVisible={setVisible} /> : ""} */}
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
