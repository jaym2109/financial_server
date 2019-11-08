import React from "react";
import Alert from "../layout/Alert";
import background from "../../img/background.jpg";
import styled from "styled-components";

const BackgroundImg = styled.section`
  position: relative;
  background: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  z-index: 1;

  @media print {
    background: #fff;
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -2;

  @media print {
    display: none;
  }
`;

const Container = styled.div`
  margin: 0 10%;

  @media print {
    margin: 0;
  }
`;

const Layout = props => {
  return (
    <BackgroundImg>
      <DarkOverlay />
      <Container>
        <Alert />
        {props.children}
      </Container>
    </BackgroundImg>
  );
};

export default Layout;
