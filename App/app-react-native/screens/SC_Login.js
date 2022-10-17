import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  ViewBase,
  Keyboard,
  Platform,
  Pressable,
  Alert,
  Image,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import GlobalStyles from "../components/GlobalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { Feather } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hook/useTogglePasswordVisibility";
import BottomTabsNavigator from "../screens/BottomTabs.navigator";
import { ApiUser } from "../api/ApiUser";
import { ApiProfile } from "../api/ApiUser";
import { LinearGradient } from "expo-linear-gradient";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const SC_Login = ({ navigation }) => {
  const [dimensions, setDimensions] = useState({ window, screen });
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMessage, setErrMessage] = useState("");

  const [test, setTest] = useState("");
  const [token, setToken] = useState("");

  const checkPasswordValidity = (value) => {
    // const isNonWhiteSpace = /^\S*$/;
    // if (!isNonWhiteSpace.test(value)) {
    //   return "Password must not contain Whitespaces.";
    // }

    // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    // if (!isContainsUppercase.test(value)) {
    //   return "Password must have at least one Uppercase Character.";
    // }

    // const isContainsLowercase = /^(?=.*[a-z]).*$/;
    // if (!isContainsLowercase.test(value)) {
    //   return "Password must have at least one Lowercase Character.";
    // }

    // const isContainsNumber = /^(?=.*[0-9]).*$/;
    // if (!isContainsNumber.test(value)) {
    //   return "Password must contain at least one Digit.";
    // }

    // const isValidLength = /^.{8,16}$/;
    // if (!isValidLength.test(value)) {
    //   return "Password must be 8-16 Characters Long.";
    // }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };

  const handleLogin = async () => {
    const data = {
      username,
      password,
    };
    try {
      await ApiUser.login(data)
        .then((res) => {
          console.log(
            "dang nhap thanh cong voi token tra ve la: " + res.data.token
          );
        })
        .catch((err) => {
          console.log("dang nhap khong thanh cong");
        });
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  }, []);

  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#4eac6d", "#cfd1d0", "white"]}
      style={styles.container}
    >
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.wrapAllContent}>
          <View style={styles.contentHeder}>
            <Image
              source={require("../assets/logo-no-background2.png")}
              style={{ flex: 1 }}
            />
          </View>

          {/* content login */}
          <View style={[styles.wrapContentLogin, GlobalStyles.test]}>
            {/* begin title content login */}
            <View style={styles.aboveFormLogin}>
              <Text style={[styles.txtTitleHeader, { color: "black" }]}>
                Đăng nhập
              </Text>
              <Text
                style={[
                  styles.txtTitleHeaderSub,
                  { color: "black", opacity: 0.5 },
                ]}
              >
                Đăng nhập để tiếp tục sử dụng Alo
              </Text>
            </View>
            {/* end title content login */}

            {/* begin content main login with input, button checkbox,... */}
            <View style={styles.mainFormLogin}>
              {/* input so dien thoai */}
              <View style={styles.wrapNumberPhone}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Nhập số điện thoại"
                  value={username}
                  onChangeText={setUsername}
                />
                <Text style={styles.notificationError}>{errMessage}</Text>
              </View>

              {/* input password */}
              <View style={styles.wrapPassword}>
                <View>
                  <TextInput
                    style={styles.input}
                    name="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    enablesReturnKeyAutomatically
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Nhập mật khẩu"
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <Feather
                      name={rightIcon}
                      size={22}
                      color="#232323"
                      style={{
                        width: 50,
                        position: "absolute",
                        right: 0,
                        bottom: 10,
                      }}
                    />
                  </Pressable>
                  <Text style={styles.notificationError}>{errMessage}</Text>
                </View>
              </View>

              {/* remember password and forget password */}
              <View style={styles.wrapDiff}>
                <View style={styles.checkBoxRememberPassWord}>
                  <BouncyCheckbox
                    size={16}
                    text="Nhớ mật khẩu"
                    fillColor="#4eac6d"
                    unfillColor="#FFFFFF"
                    textStyle={{
                      textDecorationLine: "none",
                      marginLeft: -10,
                      fontSize: 16,
                    }}
                    iconStyle={{ borderColor: "#4eac6d" }}
                    innerIconStyle={{ borderWidth: 2 }}
                  />
                </View>
                <TouchableOpacity style={styles.forgetPassword}>
                  <Text style={{ fontSize: 16 }}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
              </View>

              {/* button login */}
              <View style={styles.wrapBtnLogin}>
                {username == "" || password == "" ? (
                  <TouchableOpacity
                    disabled
                    style={[styles.btnLogin, { backgroundColor: "#6b706c" }]}
                    // onPress={() => navigation.navigate("BottomTabsNavigator")}
                    onPress={handleLogin}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      Đăng Nhập
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnLogin}
                    // onPress={() => navigation.navigate("BottomTabsNavigator")}
                    // onPress={onSubmitHandler}
                    onPress={handleLogin}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      Đăng Nhập
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* chuyen den dang ky moi */}
              <View style={styles.dontHaveAccount}>
                <Text style={styles.useAllText16}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SC_Register")}
                >
                  <Text
                    style={[
                      styles.useAllText16,
                      {
                        color: "blue",
                        fontWeight: "800",
                        textDecorationLine: "underline",
                        marginLeft: 5,
                      },
                    ]}
                  >
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* end content main login with input, button, checkbox,... */}

            {/* thong tin khac */}
            <View style={styles.footerFormLogin}>
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
    //backgroundColor: "#4eac6d",
  },

  useAllText16: {
    fontSize: 16,
  },

  wrapAllContent: {
    margin: 24,
    // backgroundColor: "red",
  },

  wrapContentLogin: {
    flex: 1,
    // marginTop: 24,
    // height: Dimensions.get("window").width * 1.55,
    // padding: 24,
    // // backgroundColor: "white",
    // borderRadius: 20,
  },

  contentHeder: {
    flex: 1,
    alignItems: "center",
    height: "20%",
    marginBottom: 24,
    // flexGrow: 3,
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

  aboveFormLogin: {
    flex: 1,
    flexGrow: 2,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // marginBottom: 24,
    // backgroundColor: "blue",
  },

  mainFormLogin: {
    flex: 1,
    // backgroundColor: "violet",
    flexGrow: 6,
  },

  footerFormLogin: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "pink",
    // flexGrow: 0.5,
  },

  wrapNumberPhone: {
    marginBottom: 24,
  },

  wrapPassword: {
    marginBottom: 14,
  },

  input: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    padding: 10,
  },

  wrapDiff: {
    flex: 1,
    // flexGrow: 1,
    // marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },

  checkBoxRememberPassWord: {
    flexDirection: "row",
    alignItems: "center",
  },

  wrapBtnLogin: {
    flex: 1,
    // flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "red",
  },

  btnLogin: {
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

  dontHaveAccount: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  notificationError: {
    color: "red",
    fontSize: 14,
    marginLeft: 10,
  },
});

export default SC_Login;
