import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import rising from "../../img/rising.svg";
import { logout } from "../../actions/auth";
import styled from "styled-components";

const BrandLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 20px;
  margin-right: 10px;
`;

const Brand = styled(Link)`
  text-decoration: none;
  display: flex;

  h2 {
    color: #fff;
    margin-top: 28px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  padding: 0 10px;
  margin-top: 30px;

  &:hover {
    color: #333;
  }
`;

const Container = styled.div`
  margin: 0 10%;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  height: 60px;
  background-color: #000;
  width: 100%;

  @media print {
    display: none;
  }
`;

const NavLinks = styled.nav`
  list-style: none;
  display: flex;
  padding: 5px;
`;

const NavLink = styled.li`
  display: flex;

  a {
    text-decoration: none;
    color: #fff;
    display: flex;
    margin-top: 28px;
    padding: 0 10px;

    &:hover {
      color: #333;
    }
  }

  i {
    padding-right: 10px;
  }

  p {
    position: relative;
  }
`;

const RightNav = styled.div`
  display: flex;
`;

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <NavLinks>
      <NavLink>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" /> <span>Logout </span>
        </a>
      </NavLink>
    </NavLinks>
  );

  const guestLinks = <StyledLink to="/login">Login</StyledLink>;

  const adminLinks = () => {
    if (isAuthenticated && user) {
      if (user.isAdmin) {
        return (
          <NavLinks>
            <NavLink>
              <StyledLink to="/register">
                <i className="fas fa-user-plus" />
                <p>Add User</p>
              </StyledLink>
            </NavLink>
            <NavLink>
              <StyledLink to="/settings">
                <i className="fas fa-cog" /> <p>Settings</p>
              </StyledLink>
            </NavLink>
            <NavLink>
              <a onClick={logout} href="#!">
                <i className="fas fa-sign-out-alt" /> <p>Logout </p>
              </a>
            </NavLink>
          </NavLinks>
        );
      } else {
        return authLinks;
      }
    } else {
      return guestLinks;
    }
  };

  return (
    <Nav>
      <Container>
        <Brand to="/">
          <BrandLogo src={rising} alt="logo" />
          <h2>Financial Server</h2>
        </Brand>
        <RightNav>
          {!loading && isAuthenticated && (
            <NavLinks>
              <NavLink>
                <StyledLink to="/income-statement">Income Statement</StyledLink>
              </NavLink>
              <NavLink>
                <StyledLink to="/forecast">Forecast</StyledLink>
              </NavLink>
              <NavLink>
                <StyledLink to="/balance-sheet">Balance Sheet</StyledLink>
              </NavLink>
              <NavLink>
                <StyledLink to="/cash-flow">Cash Flow</StyledLink>
              </NavLink>
            </NavLinks>
          )}
          {!loading && <Fragment> {adminLinks()}</Fragment>}
        </RightNav>
      </Container>
    </Nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
