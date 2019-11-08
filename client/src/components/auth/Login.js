import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Layout from "../layout/Layout";
import styled from "styled-components";

const FormContent = styled.div`
  color: #272121;
  background: #fff;
  position: relative;
  padding: 40px 20px;
  top: 259px;
  height: 250px;
  border-radius: 10px;
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #41a17a;
  }
`;

const SubHeader = styled.div`
  display: flex;
  font-size: 2rem;
  padding-bottom: 10px;
  i {
    padding-right: 10px;
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  position: relative;
  margin: 5px;
  padding: 10px 15px;
  border-radius: 5px;
  border: 2px solid #41a17a;
  color: #272121;
  width: 90%;
  outline: none;

  &::placeholder {
    color: #41a17a;
    font-weight: bold;
  }
`;

const FormButton = styled.button`
  height: 40px;
  width: 120px;
  border-radius: 4px;
  border: none;
  margin: 5px;

  background: #41a17a;
  color: #fff;
  text-transform: uppercase;
`;

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  let { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/income-statement" />;
  }

  return (
    <Layout>
      <FormContent>
        <h1>Login</h1>
        <SubHeader>
          <i className="fas fa-user" />
          <p>Log Into Your Account</p>
        </SubHeader>

        <FormStyle onSubmit={e => onSubmit(e)}>
          <FormInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={e => onChange(e)}
            required
            className="form-control"
          />
          <FormInput
            type="password"
            name="password"
            minLength="6"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
            className="form-control"
          />
          <FormButton className="btn">Login</FormButton>
        </FormStyle>
      </FormContent>
    </Layout>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
