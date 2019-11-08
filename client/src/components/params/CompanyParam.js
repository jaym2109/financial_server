import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CompanyParam = ({ onChangeHandler, company, auth: { user } }) => {
  const onChange = e => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    onChangeHandler(fieldName, fieldValue);
  };
  const compAccess = () => {
    if (user) {
      return (
        <div className="form-group">
          <label htmlFor="company_drilldown">Company: </label>
          <select
            name="company_dropdown"
            id="company_dropdown"
            className="custom-select"
            defaultValue={company}
            onChange={onChange}
          >
            {user.companys.length === 6 ? (
              <option value="ALL">ALL</option>
            ) : null}
            {user.companys.map(comp => {
              if (comp === company) {
                return <option key={comp}>{comp}</option>;
              } else {
                return <option key={comp}>{comp}</option>;
              }
            })}
          </select>
        </div>
      );
    } else {
      return null;
    }
  };
  return compAccess();
};

CompanyParam.propTypes = {
  auth: PropTypes.object.isRequired,
  company: PropTypes.string
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.params.company
});

export default connect(mapStateToProps)(CompanyParam);
