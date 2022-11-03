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
} from "react-native";
import { BackIcon, PhoneIcon, VideoIcon } from "../components/IconBottomTabs";
import { GiftedChat } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiProfile, ApiUser } from "../api/ApiUser";
import axios from "axios";

const size = 24;

const SC_Chat = (navigation, route) => {
  const [messages, setMessages] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [avatar, setAvatar] = useState("");

  const getId = useCallback(async () => {
    setCurrentName(await AsyncStorage.getItem("currentName"));
    setAvatar(await AsyncStorage.getItem("avatar"));
  }, []);

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
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
    flexDirection: "row",
    justifyContent: "space-around",
  },

  contentChat: {
    flex: 1,
    marginTop: 1,
  },
});

export default SC_Chat;
