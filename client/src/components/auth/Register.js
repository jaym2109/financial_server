import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Layout from "../layout/Layout";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormContent = styled.div`
  color: #272121;
  background: #fff;
  position: relative;
  padding: 40px 20px;
  top: 200px;
  height: 500px;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  small {
    color: #272121;
    margin-left: 8px;
  }
`;

const FormCheckBox = styled.div`
  display: flex;
  margin-top: 10px;
  input {
    -webkit-appearance: none;
    background: none;
    border: 2px solid #41a17a;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 9px;
    margin: 0 5px;
    border-radius: 3px;
    display: inline-block;
    position: relative;

    &:checked {
      background-color: #41a17a;
      border: 2px solid #41a17a;
      color: #fff;
    }

    &:checked:after {
      content: "✔";
      font-size: 14px;
      position: absolute;
      top: 0px;
      left: 3px;
      color: #fff;
    }
  }
`;

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    isAdmin: false,
    companys: [],
    defaultCompany: ""
  });

  let {
    name,
    email,
    password,
    password2,
    isAdmin,
    companys,
    defaultCompany
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password, isAdmin, companys, defaultCompany });
    }
  };

  return (
    <Layout>
      <FormContent>
        <h1>Add New User</h1>
        <SubHeader>
          <i className="fas fa-user" />
          <p>Add a New User</p>
        </SubHeader>

        <FormStyle onSubmit={e => onSubmit(e)}>
          <FormInput
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <FormInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <FormInput
            type="password"
            name="password"
            minLength="6"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
          />
          <FormInput
            type="password"
            name="password2"
            minLength="6"
            placeholder="Confirm Password"
            value={password2}
            onChange={e => onChange(e)}
          />
          <FormGroup>
            <FormInput
              type="text"
              name="companys"
              placeholder="Company Access"
              value={companys}
              onChange={e => onChange(e)}
            />
            <small>
              Enter the companies the user should have access to seperated by a
              "," ie. JAM, OP, ELX
            </small>
          </FormGroup>
          <FormInput
            type="text"
            name="defaultCompany"
            placeholder="Default Company"
            value={defaultCompany}
            onChange={e => onChange(e)}
          />
          <FormCheckBox>
            <input
              type="checkbox"
              name="isAdmin"
              value={isAdmin}
              onChange={e => onChange(e)}
            />
            <span className="checkmark" />
            <label htmlFor="isAdmin" className="form-check-label">
              Administrator?
            </label>
          </FormCheckBox>
          <FormButton value="Register">Submit</FormButton>
        </FormStyle>
      </FormContent>
    </Layout>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
