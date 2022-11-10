import "./App.scss";
import { Routes, Route } from "react-router-dom";
import mainRoutes, { authRoutes } from "./routes/Routes";
import LayoutMain from "./layout/layout-main/LayoutMain";
import LayoutAuth from "./layout/layout-auth/LayoutAuth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  faXmark, faCamera, faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFriend from "./components/list-friend/ListFriend";
import UserChat from "./components/userchat/UserChat";
import ModalGroup from "./components/modalGroup/ModalGroup";

function App() {
  let isAuth = useSelector((state) => state.user.isLoggedIn);
  const [isModal, setIsModal] = useState(false);
  const hideModalHandle = () => {
    setIsModal(!isModal)
  }
  return (
    <div className="App">
      {/* App dùng cho router */}
      {isModal ? <ModalGroup onClose={() => setIsModal(false)}/> : ""}
      {isAuth ? (
        <Routes>
          {mainRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutMain>
                    <Page onClick = {hideModalHandle} />
                  </LayoutMain>
                }
              ></Route>
            );
          })}
        </Routes>
      ) : (
        <Routes>
          {authRoutes.map((route, index) => {
            const Page = route.component;
            let isRegister = false;
            if (route.path === "/info") {
              isRegister = true;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutAuth isRegister={isRegister}>
                    <Page />
                  </LayoutAuth>
                }
              ></Route>
            );
          })}
        </Routes>
      )}
    </div>
  );
}

export default App;
