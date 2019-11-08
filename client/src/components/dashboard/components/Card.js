import React from "react";
import styled from "styled-components";
import { numCurrency, numPct } from "../../../utils/formatting";

const CardContainer = styled.div`
  width: 256px;
  height: 64px;
  color: #333a56;
  font-family: "raleway";
  background: #f7f5e6;
`;

const Title = styled.h3`
  background: ${props => props.color};
  color: #f7f5e6;
  font-weight: 300;
  padding: 5px;
`;

const Content = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;

  h3 {
    font-weight: 500;
  }
`;

const Card = ({ section, comparison }) => (
  <CardContainer>
    <Title color={section.color}>{section.name}</Title>
    <Content>
      <h3>{numCurrency(section.amount, 0)}</h3>
      <h3>{numPct(section.amount / comparison.amount, 0)}</h3>
    </Content>
  </CardContainer>
);

export default Card;
