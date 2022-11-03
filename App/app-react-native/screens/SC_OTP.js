import React, { useState, useRef, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import CodeInputField from "../components/CodeInputField";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VerifyIcon } from "../components/IconBottomTabs";

const { width } = Dimensions.get("window");

const SC_OTP = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const { username, password } = route.params;

  const MAX_CODE_LENGTH = 4;

  function test() {
    if (code === "") {
      console.log("code: " + code, " pin: " + pinReady);
      navigation.navigate("SC_Continue", {
        username: username,
        password: password,
      });
    } else {
      Alert.alert("Ma  OTP khong chinh xac!");
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 70,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          //   flexGrow: 3,
        }}
      >
        <Image
          style={styles.image}
          source={require("../assets/otp.png")}
          resizeMode="contain"
        />
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 5 }}>
            Xác thực OTP
          </Text>
          <Text style={{ fontSize: 16 }}>
            OTP được gửi qua số điện thoại của bạn
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 0.5,
        }}
      >
        <CodeInputField
          setPinReady={setPinReady}
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
        />
        <Text style={{ fontSize: 16 }}>OTP tồn tại trong: 0 giây</Text>
      </View>
      <View style={styles.wrapBtn}>
        <TouchableOpacity style={styles.btnVerify} onPress={test}>
          <VerifyIcon color="green" size={24} />
          <Text
            style={{ fontSize: 18, fontWeight: "500", textAlign: "center" }}
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  wrapBtn: {
    flex: 1,
    // flexGrow: 2,
  },

  btnVerify: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },

  image: {
    maxWidth: 200,
    maxHeight: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SC_OTP;
