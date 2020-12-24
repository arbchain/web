import styled from 'styled-components';
import { GU, textStyle, theme } from '@aragon/ui';

const SectionWrapper = styled.section`
  overflow: hidden;
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
  .procedure-status {
    border: 1px solid #dde4e9;
    padding: 20px;
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
      font-size: 16px !important;
    }
    .status {
      span {
        width: 94px;
        height: auto;
        background-color: #ebdef0;
        padding: 5px 20px;
        border-radius: 3px;
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
  grid-row-gap: 30px;
  .description {
    display: flex;
    align-items: center;
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
  margin-top: 22px;
  .pro-status {
    background-color: rgba(251, 119, 119, 0.5);
    padding: 5px 20px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px 0 24px 0;
  .success {
    width: 100px;
    background-color: #21d48e;
    color: #fff;
    text-align: center;
    justify-content: center;
    height: 32px;
    border: 1px solid #dde4e9;
    border-radius: 3px;
    margin-right: 10px;
  }
  .error {
    width: 100px;
    background-color: #fb7777;
    color: #fff;
    text-align: center;
    justify-content: center;
    height: 32px;
    border: 1px solid #dde4e9;
    border-radius: 3px;
  }
`;

export const Info = styled.div`
  border-radius: 3px;
  margin-top: 25px;
  display: flex;
  width: 100%;
  height: 40px;
  background-color: rgba(33, 212, 142, 0.3);
  color: #3d4857;
  align-items: center;
  text-align: center;
  justify-content: center;
  overflow: hidden;
`;

export const SubmittedResponse = styled.div`
  margin-top: 10px;
  .heading-container {
    display: flex;
    justify-content: space-between;
  }
  .summary {
    padding: 20px;
    border: 1px solid #dde4e9;
  }
  .attachment {
    margin-top: 20px;
  }
`;

export default SectionWrapper;
