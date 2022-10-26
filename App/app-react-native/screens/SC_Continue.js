import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Pressable,
  Animated,
  Platform,
  Appearance,
  Alert,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import GlobalStyles from "../components/GlobalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-datepicker";
import { LinearGradient } from "expo-linear-gradient";
import { ApiRegisterUser } from "../api/ApiUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SC_Continue = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [animatePress, setAnimatePress] = useState(new Animated.Value(1));
  const [gender, setGender] = React.useState("");
  const [male, setMale] = React.useState(false);
  const [female, setFemale] = React.useState(false);
  const [genderOther, setGenderOther] = React.useState(false);
  const [introduceYourself, setIntroduceYourself] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const { username, password } = route.params;

  // useEffect(async () => {
  //   setUsername(await AsyncStorage.getItem("username"));
  //   setPassword(await AsyncStorage.getItem("password"));
  // }, []);

  // for date
  Animated.timing(animatePress, {
    toValue: 0.5,
    duration: 500,
    useNativeDriver: true, // Add This line
  }).start();

  const eventMale = () => {
    setMale(true);
    setFemale(false);
    setGenderOther(false);
    setGender("Nam");
  };

  const eventFemale = () => {
    setMale(false);
    setFemale(true);
    setGenderOther(false);
    setGender("Nữ");
  };

  const eventGenderOther = () => {
    setMale(false);
    setFemale(false);
    setGenderOther(true);
    setGender("Khác");
  };

  const showGender = () => {
    Alert.alert(gender);
  };

  const handleRegister = async () => {
    const data = {
      username: username,
      password: password,
      name: name,
      gender: gender,
      introducePersonal: introduceYourself,
    };

    // const res = await ApiRegisterUser.register(data);
    // if (res.status === 201) {
    //   Alert.alert("dang ky thanh cong");
    //   console.log("dang ky thanh cong");
    // } else if (res.status === 400) {
    //   Alert.alert("dang ky  khong thanh cong");
    //   console.log("dang ky khong thanh cong");
    // } else {
    //   Alert.alert("loi khi tao");
    //   console.log("loi khi tao");
    // }

    try {
      await ApiRegisterUser.register(data)
        .then(async (res) => {
          console.log(
            "dang ky thanh cong voi so dien thoai tra ve la: " +
              res.data.user.username
          );
          navigation.navigate("SC_Login");
        })
        .catch((err) => {
          console.log("Dang ky khong thanh cong" + err);
        });
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#4eac6d", "#cfd1d0", "#cfd1d0"]}
      style={styles.container}
    >
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.wrapAllContent}>
          {/* content Register */}
          <View style={[styles.wrapContentVerify, GlobalStyles.test4]}>
            {/* begin title content Register */}
            <View style={styles.aboveFormVerify}>
              <Text style={[styles.txtTitleHeader, { color: "black" }]}>
                Thông tin cá nhân
              </Text>
              <Text
                style={[
                  styles.txtTitleHeaderSub,
                  { color: "black", opacity: 0.5 },
                ]}
              >
                Điền thông tin cá nhân của bạn
              </Text>
            </View>
            {/* end title content Register */}

            {/* begin content main Register with input, button checkbox,... */}
            <View style={styles.mainFormVerify}>
              {/* input so dien thoai */}
              <View style={[styles.wrapName, GlobalStyles.test3]}>
                <TextInput
                  style={styles.inputBorderBottom}
                  placeholder="Nhập họ và tên"
                  value={name}
                  onChangeText={setName}
                />
                <Text style={styles.notificationError}>{errMessage}</Text>
              </View>

              {/* input password */}
              <View style={[styles.wrapBirthDate, GlobalStyles.test3]}>
                <Text style={styles.txtOfInput}>Ngày tháng năm sinh</Text>
                <Animated.View>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                  />
                </Animated.View>
                <Text style={styles.notificationError}>{errMessage}</Text>
              </View>

              {/* input password again */}
              <View style={[styles.wrapGender, GlobalStyles.test3]}>
                <Text style={styles.txtOfInput}>Giới tính</Text>
                <View style={styles.wrapCheckBoxGender}>
                  <View>
                    <CheckBox
                      center
                      title="Nam"
                      // checkedIcon="dot-circle-o"
                      // uncheckedIcon="circle-o"
                      checked={male}
                      containerStyle={{ padding: 5 }}
                      // onPress={() => setMale(!male)}
                      onPress={eventMale}
                    />
                  </View>
                  <View>
                    <CheckBox
                      center
                      title="Nữ"
                      // checkedIcon="dot-circle-o"
                      // uncheckedIcon="circle-o"
                      checked={female}
                      containerStyle={{ padding: 5 }}
                      onPress={eventFemale}
                    />
                  </View>
                  <View>
                    <CheckBox
                      center
                      title="Khác"
                      // checkedIcon="dot-circle-o"
                      // uncheckedIcon="circle-o"
                      checked={genderOther}
                      containerStyle={{ padding: 5 }}
                      onPress={eventGenderOther}
                    />
                  </View>
                </View>
                <Text style={styles.notificationError}>{errMessage}</Text>
              </View>

              <View style={[styles.wrapIntroducePersonal, GlobalStyles.test3]}>
                <Text style={styles.txtOfInput}>Giới thiệu bản thân</Text>
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  placeholder="Giới thiệu sơ lược về bản thân của bạn"
                  value={introduceYourself}
                  onChangeText={setIntroduceYourself}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              {/* button Register */}
              <View style={styles.wrapBtnCompleted}>
                <TouchableOpacity
                  style={styles.btnCompleted}
                  onPress={handleRegister}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Hoàn tất {username}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* chuyen den dang ky moi */}
              <View style={styles.haveAccount}>
                <Text style={styles.useAllText16}>Bạn đã có tài khoản ?</Text>
                <TouchableOpacity
                  // onPress={() => navigation.navigate("SC_Login")}
                  onPress={showGender}
                >
                  <Text
                    style={[
                      styles.useAllText16,
                      {
                        color: "#4eac6d",
                        fontWeight: "800",
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    {" "}
                    Đăng nhập !
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* end content main Register with input, button, checkbox,... */}

            {/* thong tin khac */}
            <View style={styles.footerFormRegister}>
              <Text style={[{ fontWeight: "900", textAlign: "center" }]}>
                © 2022 Alo. Thiết kế bởi CDNTV
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4eac6d",
  },

  useAllText16: {
    fontSize: 16,
  },

  wrapAllContent: {
    margin: 24,
    // backgroundColor: "red",
  },

  wrapContentVerify: {
    flex: 1,
    // marginTop: 24,
    height: Dimensions.get("window").width * 1.8,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 20,
  },

  contentHeder: {
    flex: 2,
    alignItems: "center",
    height: "20%",
    flexGrow: 2,
  },

  txtTitleHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  txtTitleHeaderSub: {
    color: "white",
    opacity: 0.8,
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },

  aboveFormVerify: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 30,
    // backgroundColor: "blue",
  },

  mainFormVerify: {
    flex: 1,
    // backgroundColor: "violet",
    flexGrow: 8,
  },

  footerFormRegister: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "pink",
    flexGrow: 0.5,
  },

  wrapName: {
    marginBottom: 15,
  },

  datePickerStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },

  input: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
  },

  inputBorderBottom: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    padding: 10,
  },

  txtOfInput: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  wrapCheckBoxGender: {
    marginTop: -10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  wrapBtnCompleted: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  btnCompleted: {
    paddingVertical: 15,
    width: "100%",
    backgroundColor: "#4eac6d",
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 10,
  },

  haveAccount: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  notificationError: {
    color: "red",
    fontSize: 14,
    marginLeft: 10,
  },
});

export default SC_Continue;
