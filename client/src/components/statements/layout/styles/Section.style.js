import styled from "styled-components";

const sectionColors = id => {
  switch (id) {
    case "revenue":
    case "assets":
      return "#90CBB3";
    case "direct-costs":
    case "liab":
      return "#8F6166";
    case "ga-expenses":
      return "#72618F";
    case "other-inc":
      return "#D1B187";
    case "inc-taxes":
      return "#8537C1";
    case "equity":
      return "#5A76D2";
    default:
      return "#fff";
  }
};

const subSectionColors = id => {
  switch (id) {
    case "curr-assets":
    case "lt-assets":
      return "#41A17A";
    case "curr-liab":
    case "other-liab":
      return "#8F6166";
    case "equity":
      return "#5A76D2";
    default:
      return "#fff";
  }
};

// Subsection Styles
export const SubSectionHeader = styled.th`
  text-align: left;
  color: ${props => subSectionColors(props.subSection)};
  padding: 5px;
`;

export const SubSectionFooter = styled.th`
  text-align: left;
  color: ${props => subSectionColors(props.subSection)};
  border-top: 1px solid ${props => subSectionColors(props.subSection)};
  padding: 5px;
`;

export const SubSectionFooterTotals = styled.th`
  text-align: right;
  color: ${props => subSectionColors(props.subSection)};
  border-top: 1px solid ${props => subSectionColors(props.subSection)};
  padding: 5px;
`;

// Section Styles
export const SectionHeader = styled.th`
  text-align: left;
  color: #fff;
  background: ${props => sectionColors(props.section)};
  padding: 5px;
`;

export const SectionFooter = styled.th`
  text-align: left;
  color: #272121;
  border-top: 1px solid #272121;
  padding: 5px;
`;

export const SectionFooterTotals = styled.th`
  text-align: right;
  color: #272121;
  border-top: 1px solid #272121;
  padding: 5px;
`;

export const MarginFooter = styled.th`
  text-align: left;
  color: #272121;
  border-bottom: 1px solid #272121;
  padding: 5px;
`;

export const MarginFooterTotals = styled.th`
  text-align: right;
  color: #272121;
  border-bottom: 1px solid #272121;
  padding: 5px;
`;
