import styled from "styled-components";

export const InnerBackground = styled.div`
  position: relative;
  background: #fff;
  max-width: 1366px;
  width: 90%;

  @media print {
    position: absolute;
    width: 100%;
    max-width: 100%;
  }
`;

export const StatementContainer = styled.div`
  position: relative;
  background: #f3efea;
  margin: 0 auto;
  width: 60%;

  @media print {
    width: 100%;
    margin: 0;
    background: #fff;
  }
`;
