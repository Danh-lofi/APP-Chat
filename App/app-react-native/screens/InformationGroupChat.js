import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import FileComponent from "../components/FileComponent";
import {
  AddNewIcon,
  BackIcon,
  BellIcon,
  BlockIcon,
  FileIcon,
  GeneralGroupIcon,
  LeaveGroup,
  ListMember,
  NextIcon,
  NotificationIcon,
  PersonalIcon,
  SearchICon,
} from "../components/IconBottomTabs";
import ImageComponent from "../components/ImageComponent";
import { ApiGetUser } from "../api/ApiUser";
import ApiLoadGroupChat from "../api/LoadGroupChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../components/GlobalStyles";
import Modal from "react-native-modal";
import { XIcon } from "../components/IconBottomTabs";
import FriendBar from "../components/FriendBar";
import SearchFriendBar from "../components/SearchFriendBar";
import ApiLoadFriend from "../api/ApiLoadFriend";

const { width } = Dimensions.get("window");
const size = 22;

const DATA = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export const InformationGroupChat = ({ navigation, route }) => {
  const idGroup = route.params;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState();
  const [idUser, setIdUser] = useState("");
  const [idAdmin, setIdAdmin] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [listMember, setListMember] = useState([]);
  const [addListMember, setAddListMember] = useState([]);
  const [modalAddMember, setModalAddMember] = useState(false);
  const [infor, setInfor] = useState([]);
  let aMembers = [];
  const [friendNotInGroup, setFriendNotInGroup] = useState([]);
  const [filterBeforeAdd, setFilterBeforeAdd] = useState([]);
  const [modalTransferRights, setModalTransferRights] = useState(false);
  const [listMemberNotAdmin, setListMemberNotAdmin] = useState();

  const handleClick = (item) => {
    aMembers.push({
      id: item._id,
    });
  };

  const getFriend = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    await ApiLoadFriend.getFriend(token)
      .then((res) => {
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

  const getProfile = async () => {
    setIdUser(await AsyncStorage.getItem("idUser"));
    // console.log(idGroup.idGroup);
    if (idGroup.idGroup === "") {
      console.log("id null");
    } else {
      const data = await ApiLoadGroupChat.getInforGroupChat(idGroup.idGroup);
      if (data.data === null) {
        console.log("Khong lay duoc du lieu");
      } else {
        setAvatar(data.data.imgGroupChat);
        setName(data.data.nameGroupChat);
        setIdAdmin(data.data.adminGroup);
        await ApiLoadGroupChat.getMemberGroupChat(data.data._id)
          .then((res) => {
            console.log("-=-=--=-=-=-=-=-=-");
            console.log(res.data.length);
            setListMember(
              res.data.filter((element) => {
                return element !== null;
              })
            );
          })
          .catch((err) => {
            console.log("410 " + err);
          });
      }
    }
  };

  useEffect(() => {
    getFriend();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const getFriendNotInGroup = () => {
    const results = infor.filter(
      ({ _id: id1 }) => !listMember.some(({ _id: id2 }) => id2 === id1)
    );
    setAddListMember(results);
  };

  const getListMemberNotAdmin = () => {
    const rs = listMember.filter((user) => user._id !== idAdmin);
    setListMemberNotAdmin(rs);
    console.log(listMemberNotAdmin);
  };

  useEffect(() => {
    if (modalTransferRights === true) {
      getListMemberNotAdmin();
    }
  }, [modalTransferRights]);

  useEffect(() => {
    if (modalAddMember === true) {
      getFriendNotInGroup();
    }
  }, [modalAddMember]);

  const openModalSearch = () => {
    setModalVisible(!isModalVisible);
  };

  const openModalAddMember = () => {
    aMembers = [];
    setModalAddMember(!modalAddMember);
  };

  const openModalTransferRights = () => {
    setModalTransferRights(!modalTransferRights);
  };

  const leaveGroup = async () => {
    const token = await AsyncStorage.getItem("token");
    if (idUser === "" || idAdmin === "" || idGroup.idGroup == "") {
      console.log("khong co idUer or idAdmin");
    } else {
      if (idUser === idAdmin) {
        Alert.alert(
          "Ban phai nhuong quyen admin cho 1 thanh vien khac truoc khi roi nhom!"
        );
        openModalTransferRights();
      } else {
        const sttLeaveGroup = await ApiLoadGroupChat.leaveGroup(
          token,
          idGroup.idGroup
        );
        if (sttLeaveGroup.status === 201) {
          console.log("roi nhom thanh cong");
          Alert.alert("Roi nhom thanh cong");
          navigation.replace("BottomTabsNavigator");
        }
      }
    }
  };

  const deleteGroup = async () => {
    if (idGroup.idGroup === "") {
    } else {
      const data = await ApiLoadGroupChat.deleteGroup(idGroup.idGroup);
      if (data.status === 204) {
        Alert.alert("Giải tán nhóm thành công");
        navigation.replace("BottomTabsNavigator");
      }
    }
  };

  const ListFriend = () => (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ marginTop: 20, marginRight: 20 }}>
        <FlatList
          data={addListMember}
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

  const ListMemberChat = ({ members, admin, user, onPress }) => {
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
            <Image
              source={{ uri: members.avatar }}
              style={styles.wrapAvatarZL}
            />
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
            <TouchableOpacity style={styles.xxxDiff} onPress={onPress}>
              <XIcon color="#000" size={22} />
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      </View>
    );
  };

  const chooseAdmin = async (item) => {
    const rs = await ApiLoadGroupChat.franchiesAdmin(idGroup.idGroup, item._id);
    if (rs.status === 200) {
      Alert.alert("Nhường quyền admin thành công cho " + item.name);
      getProfile();
    }
  };

  const TransferRights = ({ members, onPress }) => {
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
            <Image
              source={{ uri: members.avatar }}
              style={styles.wrapAvatarZL}
            />
          </View>
          <View style={styles.aMess_right}>
            <View style={styles.name_and_disMess}>
              <Text numberOfLines={1} style={styles.txtNameMess}>
                {members.name}
              </Text>
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
          <TouchableOpacity style={styles.xxxDiff} onPress={onPress}>
            <Image source={require("../assets/software-engineer.png")} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const addGroup = async () => {
    if (aMembers.length < 1) {
      Alert.alert("hay bam vao dau + de them vao danh sach");
    } else {
      aMembers = aMembers.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      const rs = await ApiLoadGroupChat.addUsersToGroup(
        idGroup.idGroup,
        aMembers
      );
      if (rs.status === 200) {
        Alert.alert("Them thanh cong");
        getProfile();
      }
    }
  };

  const chooseDeleteUser = async (item) => {
    const rs = await ApiLoadGroupChat.deleteMemberFromGroup(
      idGroup.idGroup,
      item._id
    );
    if (rs.status === 200) {
      Alert.alert("Đã xoá " + item.name + " ra khỏi nhóm!");
      getProfile();
    } else {
      Alert.alert("Xoa khong thanh cong");
    }
  };

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
      <View style={styles.tabBarChat}>
        <TouchableOpacity
          style={[styles.icon, { flexDirection: "row" }]}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color="white" size={size} />
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
            Quay lại
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.informationMain}>
        <View style={styles.wrapAvatar_Name_Bio}>
          <Image
            source={{ uri: avatar }}
            style={[
              styles.image,
              {
                width: 100,
                height: 100,
                borderRadius: 120,
                borderWidth: 4,
              },
            ]}
            resizeMode={"stretch"}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
                {name}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {idAdmin === idUser ? (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  width: "20%",
                }}
                onPress={openModalTransferRights}
              >
                <Image source={require("../assets/software-engineer.png")} />
                <Text style={{ textAlign: "center" }}>Nhường quyền </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  width: "20%",
                }}
              >
                <SearchICon color="#000" size={size} />
                <Text style={{ textAlign: "center" }}>Tìm tin nhắn</Text>
              </TouchableOpacity>
            )}

            {idAdmin === idUser ? (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",

                  width: "20%",
                }}
                onPress={openModalAddMember}
              >
                <AddNewIcon color="#000" size={size} />
                <Text style={{ textAlign: "center" }}>Thêm thành viên</Text>
              </TouchableOpacity>
            ) : (
              ""
            )}

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",

                width: "20%",
              }}
            >
              <BellIcon color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Tắt thông báo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
              }}
              onPress={() => leaveGroup()}
            >
              <LeaveGroup color="#000" size={size} />
              <Text style={{ textAlign: "center" }}>Rời nhóm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{ width: "100%", height: 5, backgroundColor: "#ccc" }}
      ></View>

      {/*  */}
      <View style={{ paddingHorizontal: 24, marginTop: 15 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
            borderBottomWidth: 1,
          }}
          onPress={openModalSearch}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <ListMember color="#009EFF" size={50} /> */}
            <Image source={require("../assets/skill.png")} />
            <Text
              style={{
                fontSize: 18,
                color: "#000",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Danh sách thành viên
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: "35%",
            }}
          >
            <NextIcon color="#000" size={50} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* img da gui */}
        <View style={styles.listImg}>
          <Text style={styles.textXXX}>Hình ảnh</Text>
          <FlatList
            data={DATA}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ImageComponent />}
          />
        </View>
        {/* file da gui */}

        <View style={{ flex: 1 }}>
          <Text style={styles.textXXX}>File</Text>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FileComponent />}
          />
        </View>
      </View>

      {idAdmin === idUser ? (
        <View style={{ paddingHorizontal: 24, marginTop: 15 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 5,
              borderBottomWidth: 1,
              justifyContent: "center",
            }}
            onPress={deleteGroup}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <ListMember color="#009EFF" size={50} /> */}
              <Image source={require("../assets/cancel.png")} />
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontWeight: "600",
                  marginLeft: 10,
                }}
              >
                Giải tán nhóm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}

      {/* modal danh sach thanh vien */}
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#000",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Danh sách thành viên
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={openModalSearch}
            >
              <XIcon color="#000" size={22} />
            </TouchableOpacity>
            {/*  */}
            <View style={[styles.tabBarSearch, { marginTop: 50 }]}>
              <TouchableOpacity style={styles.icon}>
                <SearchICon color="white" size={size} />
              </TouchableOpacity>
              <TextInput
                style={styles.wrapTextSearch}
                placeholder="Tìm kiếm thành viên"
                value={valueSearch}
                onChangeText={setValueSearch}
              />
            </View>
            <View style={styles.listRs}>
              <Text style={{ marginVertical: 20 }}>Danh sach thành viên</Text>
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={listMember}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <ListMemberChat
                      members={item}
                      admin={idAdmin}
                      user={idUser}
                      onPress={() => chooseDeleteUser(item)}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* modal them thanh vien */}
      <View>
        <Modal
          isVisible={modalAddMember}
          onBackdropPress={() => setModalAddMember(false)}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#000",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Danh sách bạn bè
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={openModalAddMember}
            >
              <XIcon color="#000" size={22} />
            </TouchableOpacity>
            {/*  */}
            <View style={[styles.tabBarSearch, { marginTop: 50 }]}>
              <TouchableOpacity style={styles.icon}>
                <SearchICon color="white" size={size} />
              </TouchableOpacity>
              <TextInput
                style={styles.wrapTextSearch}
                placeholder="Tìm kiếm thành viên"
                value={valueSearch}
                onChangeText={setValueSearch}
              />
            </View>
            <View
              style={{ width: "100%", marginTop: 24, alignItems: "flex-end" }}
            >
              <TouchableOpacity
                style={[
                  styles.icon,
                  { flexDirection: "row", backgroundColor: "red" },
                ]}
                onPress={addGroup}
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
                  Thêm
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listRs}>
              <View style={{ marginTop: 20 }}>
                <ListFriend />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* modal nhuong quyen */}
      <View>
        <Modal
          isVisible={modalTransferRights}
          onBackdropPress={() => setModalTransferRights(false)}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "#000",
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Danh sách thành viên
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={openModalTransferRights}
            >
              <XIcon color="#000" size={22} />
            </TouchableOpacity>
            {/*  */}
            <View style={[styles.tabBarSearch, { marginTop: 50 }]}>
              <TouchableOpacity style={styles.icon}>
                <SearchICon color="white" size={size} />
              </TouchableOpacity>
              <TextInput
                style={styles.wrapTextSearch}
                placeholder="Tìm kiếm thành viên"
                value={valueSearch}
                onChangeText={setValueSearch}
              />
            </View>
            <View style={styles.listRs}>
              <Text style={{ marginVertical: 20 }}>Danh sach thành viên</Text>
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={listMemberNotAdmin}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TransferRights
                      members={item}
                      admin={idAdmin}
                      user={idUser}
                      onPress={() => chooseAdmin(item)}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
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
    // width: "10%",
    padding: 10,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  informationMain: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    // borderBottomWidth: 1,
  },

  wrapAvatar_Name_Bio: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  image: {
    // width,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    padding: 24,
  },

  textXXX: {
    fontSize: 20,
    color: "#000",
    fontWeight: "500",
    marginBottom: 10,
  },

  wrapImg: {
    height: 80,
    width: 80,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  wrapFile: {
    height: 50,
    width: 50,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  listImg: {
    marginBottom: 20,
    flex: 1,
  },

  tabBarSearch: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#4eac6d",
  },

  wrapTextSearch: {
    width: "100%",
    padding: 10,
    // backgroundColor: 'black',
  },

  txtSearch: {
    fontSize: 16,
    color: "white",
    opacity: 0.5,
  },

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
