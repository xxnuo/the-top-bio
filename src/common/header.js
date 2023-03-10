import "./header.css";
import React from "react";
import { getToken } from "../utils/request";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function Header(props) {
  const { t } = useTranslation();

  const [hasToken, setHasToken] = React.useState(false);
  
  React.useEffect(()=>{
    const token = getToken();
    if(token && token.length > 0){
      setHasToken(true);
    }

  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
  }

  const handleClickSignup = () => {
    if(hasToken) {
      handleLogout()
    } else {
      window.location.href = "/register";
    }
  }

  const handleClickLogin = () => {
    if(hasToken){
      window.location.href = "/admin";
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <div className="header header-common">
      <div className="header-wraper">
        <div className="header-box">
          <div className="header-main">
            <div className="header-bar">
              <div className="header-mobile">
                <a href="/">
                  <div className="mobile-logo">THE TOP LINK</div>
                </a>
                <div className="mobile-user">
                  <div className="mobile-user-wraper">
                    <div className="mobile-user-content">
                      <div className="login-wraper user-box">
                        <div className="user-wraper" onClick={handleClickLogin}>
                          <div className="login-box user-box-mobile">
                            <span className="login-text">{hasToken ? t("header.admin"): t("header.login")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="signup-wraper user-box">
                        <div className="user-wraper" onClick={handleClickSignup}>
                          <div className="signup-box user-box-mobile">
                            <span className="signup-text">{hasToken ?t("header.logout"): t("header.signup")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-desktop">
                <div className="desktop-nav">
                  <div className="desktop-nav-wraper">
                    <a className="nav-logo" href="/">
                      <div className="logo-mobile">THE TOP</div>
                      <div className="logo-desktop">THE TOP LINK</div>
                    </a>
                    <div className="nav-item">
                      
                      <div className="item">
                        <a className="item-box" href="/">
                          <div className="item-wraper">
                            <span className="item-text">{t("header.index")}</span>
                          </div>
                        </a>
                      </div>


                      <div className="item">
                        <a className="item-box" href="/explore">
                          <div className="item-wraper">
                            <span className="item-text">{t("header.explore")}</span>
                          </div>
                        </a>
                      </div>

                      <div className="item">
                        <a className="item-box" href="https://news.the.top" target="_blank">
                          <div className="item-wraper">
                            <span className="item-text">{t("header.news")}</span>
                          </div>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="desktop-user">
                  <div className="user-wraper">
                    <div className="login-wraper user-box">
                      <div className="user-wraper" onClick={handleClickLogin}>
                        <div className="login-box">
                          <span className="login-text">{hasToken ?t("header.admin"): t("header.login")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="signup-wraper user-box">
                      <div className="user-wraper" onClick={handleClickSignup}>
                        <div className="signup-box">
                          <span className="signup-text">{hasToken ?t("header.logout"): t("header.signup")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile-box"></div>
          </div>
        </div>
      </div>
      <HeaderBackground bgColor={props.bgColor}></HeaderBackground>
    </div>
  );
}

const HeaderBackground = styled.div`
  min-width: 0px;
  padding-bottom: 100px;
  background-color: ${props => props.bgColor || "#000"};
  height: 0px;

  @media screen and (min-width: 320px) {
    padding-bottom: 100px;
  }
`;