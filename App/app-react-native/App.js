import "react-native-gesture-handler";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigator from "./screens/BottomTabs.navigator";
import LoginAndRegister from "./screens/LoginAndRegister";
import SC_Login from "./screens/SC_Login";
import SC_Register from "./screens/SC_Register";
import SC_Continue from "./screens/SC_Continue";
import SC_OTP from "./screens/SC_OTP";
import { color } from "react-native-reanimated";
import Animated from "react-native-reanimated";

// npm install @react-navigation/stack
// npx expo install react-native-gesture-handler or npm install react-native-gesture-handler
// npx expo install @react-native-masked-view/masked-view or npm install @react-native-masked-view/masked-view
// npm i react-native-keyboard-aware-scroll-view --save or yarn add react-native-keyboard-aware-scroll-view
//npm install react-native-loading-spinner-overlay or yarn add react-native-loading-spinner-overlay
// npm install @rneui/themed @rneui/base
//npm install --save react-native-vector-icons
// npm install react-native-datepicker --save
// npm install react-native-paper@5.0.0-rc.6 --> yarn add react-native-vector-icons
// npm install @rneui/themed @rneui/base --> npm install @rneui/base@edge @rneui/themed@edge (
//  If you are facing issue while installing from edge dist-tag, you can install directly from Github
//) ==> npm install react-native-vector-icons (https://reactnativeelements.com/docs/troubleshooting)
// npm i @react-native-async-storage/async-storage
// npm install axios
// yarn add react-native-linear-gradient
// expo install expo-linear-gradient
// npm install local-storage --save
// npm install --save styled-components or yarn add styled-components

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  const animatedValue = useState(new Animated.Value(0))[0];

  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false, // <-- Add this
  }).start();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="LoginAndRegister"
        component={LoginAndRegister}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SC_Login"
        component={SC_Login}
        options={{ title: "Đăng nhập" }}
      />
      <MainStack.Screen
        name="SC_Register"
        component={SC_Register}
        options={{ title: "Đăng ký" }}
        // options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SC_OTP"
        component={SC_OTP}
        options={{ title: "Nhập mã OTP" }}
        // options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SC_Continue"
        component={SC_Continue}
        options={{ title: "Xác thực thông tin" }}
        // options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="BottomTabsNavigator"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SC_Login"
          component={SC_Login}
          options={{ title: "Đăng nhập" }}
        />
        <RootStack.Screen
          name="SC_Register"
          component={SC_Register}
          options={{ title: "Đăng ký" }}
        />
        <RootStack.Screen
          name="SC_OTP"
          component={SC_OTP}
          options={{ title: "Nhập mã OTP" }}
        />
        <RootStack.Screen
          name="SC_Continue"
          component={SC_Continue}
          options={{ title: "Xác thực thông tin" }}
        />
      </RootStack.Navigator>
      {/* <BottomTabsNavigator /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  test: {
    marginBottom: 10,
  },
});

export default App;
