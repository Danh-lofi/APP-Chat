import "./App.scss";
import { Routes, Route } from "react-router-dom";
import mainRoutes, { authRoutes } from "./routes/Routes";
import LayoutMain from "./layout/layout-main/LayoutMain";
import LayoutAuth from "./layout/layout-auth/LayoutAuth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  let isAuth = useSelector((state) => state.user.isLoggedIn);
  const [isModal, setIsModal] = useState(false);
  const hideModalHandle = ()=>{
    setIsModal(!isModal)
  }
  return (
    <div className="App">

      {isModal ? (
      <div style={{background: 'rgba(0, 0, 0, 0.3)',height: "100vh" , width: "100vw"}}>
        Modal
      </div>
      ) : ("")}
      
      {/* App dùng cho router */}
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
