import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Layout from "../layout/Layout";
import Card from "./components/Card";
import Loading from '../layout/Loading'; 
import { calculateISTotals } from "../statements/incomeStatement/calculations";
import { getLastDay } from "../../utils/formatting";
import { InnerBackground } from "../statements/layout/styles/Statement.style";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  font-family: "raleway";
  font-size: 3rem;
  color: #333a56;
  padding: 20px 0;
`;

const ContentContainer = styled.div`
  display: flex;
  min-height: 90vh;
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const ChartContainer = styled.div``;

const Dashboard = ({ financials: { financials, accounts } }) => {
  const [sectionTotals, setSectionTotals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (financials && accounts) {
      calculateISTotals(
        financials[0].consolidated,
        accounts[0].sections,
        "OP",
        2019,
        5,
        getLastDay(2019, 5)
      );

      setSectionTotals([
        {
          id: accounts[0].sections[0].id,
          name: accounts[0].sections[0].section,
          color: "#01B8AA",
          amount: accounts[0].sections[0].total
        },
        {
          id: accounts[0].sections[1].id,
          name: accounts[0].sections[1].section,
          color: "#FD625E",
          amount: accounts[0].sections[1].total
        },
        {
          id: accounts[0].sections[2].id,
          name: accounts[0].sections[2].section,
          color: "#F2C80F",
          amount: accounts[0].sections[2].total
        },
        {
          id: accounts[0].sections[4].id,
          name: accounts[0].sections[4].section,
          color: "#FD817E",
          amount: accounts[0].sections[4].total
        },
        {
          id: accounts[0].sections[5].id,
          name: accounts[0].sections[5].section,
          color: "#B6960B",
          amount: accounts[0].sections[5].total
        },
        {
          id: accounts[0].sections[7].id,
          name: accounts[0].sections[7].section,
          color: "#FE9666",
          amount: accounts[0].sections[7].total
        },
        {
          id: accounts[0].sections[10].id,
          name: accounts[0].sections[10].section,
          color: "#796408",
          amount: accounts[0].sections[10].total
        }
      ]);

      setLoading(false);
    }
  }, [accounts, financials]);

  if (sectionTotals && !loading) {
    return (
      <Layout>
        <InnerBackground>
          <Title>Income Statement Summary Report</Title>
          <ContentContainer>
            <CardContainer>
              {sectionTotals.map(section => (
                <Card section={section} comparison={sectionTotals[0]} key={section}/>
              ))}
            </CardContainer>
            <ChartContainer>Chart Container</ChartContainer>
          </ContentContainer>
        </InnerBackground>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <InnerBackground>
          <Loading/>
        </InnerBackground>
      </Layout>
    );
  }
};

Dashboard.propTypes = {
  financials: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  financials: state.financials
});

export default connect(mapStateToProps)(Dashboard);
