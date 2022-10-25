import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) setActiveBtn(false);
    setWidth(window.innerWidth);
  });

  const [activeBtn, setActiveBtn] = useState(false);

  return (
    <div className={styles.root} style={{ userSelect: "none" }}>
      {
        <div
          className={styles.header}
          style={{
            backgroundColor: "white",
            width: "100vw",
            height: activeBtn && width < 1024 ? "100vh" : 0,
            zIndex: 1000,
            position: "absolute",
            marginTop: 60,
            overflow: "hidden",
          }}
        >
          <div
            className={styles.buttons}
            style={{ opacity: activeBtn && width < 1024 ? 1 : 0 }}
          >
            <div style={{ display: "flex" }}>
              {window.localStorage.getItem("token") || isAuth ? (
                <div style={{ display: "flex", margin: "auto" }}>
                  <Button
                    onClick={() => {
                      navigate("/add-post");
                      setActiveBtn(false);
                    }}
                    variant="contained"
                  >
                    Написать статью
                  </Button>
                  <div>
                    <img
                      src={userData?.avatarUrl}
                      alt=""
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        marginLeft: 10,
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      setActiveBtn(false);
                      onClickLogout();
                    }}
                    variant="contained"
                    color="error"
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <div style={{ display: "flex", margin: "auto" }}>
                  <Link to="/login" onClick={() => setActiveBtn(false)}>
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link to="/register" onClick={() => setActiveBtn(false)}>
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      }

      <div className={styles.inner}>
        {width < 1024 && (
          <MenuIcon
            fontSize="large"
            style={{ marginTop: 2.5, cursor: "pointer" }}
            onClick={() => setActiveBtn((a) => !a)}
          />
        )}

        <Link
          className={styles.logo}
          to="/"
          onClick={() => setActiveBtn(false)}
        >
          <img src={require("./logo.png")} alt="" height={40} width={40}></img>
          <div style={{ marginLeft: 20 }}>Neza</div>
        </Link>

        {width < 1024 ? (
          <div style={{ width: 35 }} />
        ) : (
          <div className={styles.buttons}>
            {window.localStorage.getItem("token") || isAuth ? (
              <div style={{ display: "flex" }}>
                {/*<Button*/}
                {/*  onClick={() => navigate("/add-post")}*/}
                {/*  variant="contained"*/}
                {/*>*/}
                {/*  Написать статью*/}
                {/*</Button>*/}
                <CreateIcon
                  fontSize="large"
                  style={{ cursor: "pointer", marginTop: 2.5 }}
                  onClick={() => {
                    navigate("/add-post");
                    setActiveBtn(false);
                  }}
                />
                <div>
                  <img
                    src={userData?.avatarUrl}
                    alt=""
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                </div>
                <LogoutIcon
                  onClick={onClickLogout}
                  fontSize="large"
                  style={{ cursor: "pointer", marginTop: 2.5 }}
                />
                {/*<Button*/}
                {/*  onClick={onClickLogout}*/}
                {/*  variant="contained"*/}
                {/*  color="error"*/}
                {/*>*/}
                {/*  Выйти*/}
                {/*</Button>*/}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
