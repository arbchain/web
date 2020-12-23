import styled from 'styled-components';
import { GU, textStyle, theme } from '@aragon/ui';

const SectionWrapper = styled.section`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${2.5 * GU}px;
  align-items: center;
  h2 {
    ${textStyle('label2')};
    color: #6d777b;
    text-transform: uppercase;
    font-size: 14px;
  }
  .header {
    display: flex;
    margin-bottom: ${3 * GU}px;
    justify-content: space-between;
  }

  .title__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title__container-titleGroup {
      display: flex;
      margin-right: 2px;
      img {
        width: ${5 * GU}px;
      }
      .title__heading {
        display: block;
        margin-left: 5px;
        margin-bottom: ${GU}px;
        ${textStyle('title3')};
      }
    }
    .description {
      ${textStyle('body2')};
      color: #3d4857;
      align-items: baseline;
      justify-content: center;
    }
    .status {
      span {
        width: 94px;
        height: auto;
        background-color: #ebdef0;
        padding: 5px 20px;
        border-radius: 5px;
        text-align: center;
      }
    }
  }
`;

export const Description = styled.div`
  margin-top: 30px;
  margin-bottom: 11px;
`;

export const GridGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .description {
    ${textStyle('body2')};
    color: #3d4857;
  }
`;

export const ProcedureDetails = styled.div`
  /* h2 {
    font-weight: 300;
    font-size: 16px;
  } */
  display: flex;
  justify-content: space-between;
  .pro-status {
    background-color: rgba(251, 119, 119, 0.5);
    padding: 5px 20px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
  }
`;

export default SectionWrapper;
