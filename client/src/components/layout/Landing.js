import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import background from "../../img/background.jpg";
import { connect } from "react-redux";
import styled from "styled-components";

const BackgroundImg = styled.section`
  position: fixed;
  background: url(${background});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const DarkOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
`;

const Container = styled.div`
  margin: 0 10%;
  position: relative;
  top: 35%;
  text-align: center;
  color: #fff;

  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
    padding: 15px 0;
    margin-bottom: 20px;
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.25rem;
  text-transform: uppercase;
  background: #41a17a;
  padding: 10px 15px;
  border-radius: 4px;

  &:hover {
    color: #333;
  }
`;

const Landing = ({ auth: { isAuthenticated } }) => {
  return (
    <BackgroundImg>
      <DarkOverlay>
        <Container>
          <h1>Financial Server</h1>
          <p>Macdonald Group of Companies Financial Server</p>
          {isAuthenticated ? (
            <Button to="/income-statement">Enter</Button>
          ) : (
            <Button
              to="/login"
              className="mt-3 btn btn-primary btn-lg text-uppercase"
            >
              Login
            </Button>
          )}
        </Container>
      </DarkOverlay>
    </BackgroundImg>
  );
};

Landing.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
