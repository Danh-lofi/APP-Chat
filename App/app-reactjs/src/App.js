import "./App.scss";
import { Routes, Route } from "react-router-dom";
import mainRoutes, { authRoutes } from "./routes/Routes";
import LayoutMain from "./layout/layout-main/LayoutMain";
import LayoutAuth from "./layout/layout-auth/LayoutAuth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PreviewImage from "./components/modals/preview-image/PreviewImage";
import { imageAction } from "./store/imageSlice";
import ChangeInfo from "./components/modals/change-info/ChangeInfo";
import { faXmark, faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFriend from "./components/list-friend/ListFriend";
import UserChat from "./components/userchat/UserChat";
import ModalGroup from "./components/modalGroup/ModalGroup";
import AddFriend from "./components/modals/addfriend/AddFriend";

function App() {
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  let isAuth = useSelector((state) => state.user.isLoggedIn);
  const hideModalHandle = () => {
    setIsModal(!isModal);
  };
  const hideModalFriendHandle = () => {
    setOpenModal(!openModal);
  };
  const isSelected = useSelector((state) => state.image.isSelected);

  return (
    <div className="App">
      {isSelected ? <PreviewImage /> : ""}

      {openModal ? (
        <AddFriend onClose={() => setOpenModal(false)}></AddFriend>
      ) : (
        ""
      )}
      {/* App dùng cho router */}
      {/* <ChangeInfo /> */}
      {isModal ? <ModalGroup onClose={() => setIsModal(false)} /> : ""}
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
                    <Page
                      onOpenGroup={hideModalHandle}
                      onOpenFriend={hideModalFriendHandle}
                      onLoading={() => setLoading(!loading)}
                      isModal={isModal}
                    />
                    {/* <Page onClick={() => setOpenModal(true)} /> */}
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
