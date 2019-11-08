import React from "react";
import styled from "styled-components";

const PrintIcon = styled.i`
  position: relative;
  cursor: pointer;
  font-size: 25px;
  text-align: right;
  width: 100%;
  color: #272121;
  right: 10px;
  top: 5px;

  &:hover {
    color: #000;
  }

  @media print {
    display: none;
  }
`;

const PrintBtn = () => {
  return <PrintIcon className="fas fa-print" onClick={() => window.print()} />;
};

export default PrintBtn;
