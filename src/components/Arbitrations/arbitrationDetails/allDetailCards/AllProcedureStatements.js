import React, { useState } from 'react';
import { DropDown, GU, Text, textStyle, useTheme, Button } from '@aragon/ui';
import styled from 'styled-components';
import {downloadFile} from "../../../../lib/file-storage";

// styles

const ProcedureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
  margin-bottom: 18px;
  width: 100%;
`;

const Title = styled.h2`
  ${textStyle('label2')};
  color: ${(theme) => theme.surfaceContentSecondary};
  margin-bottom: ${2 * GU}px;
`;

function AllProcedureStatements({ seat, language, createdBy, documentLocation, documentName, cipherKey }) {
  const theme = useTheme();

  const handleClick = async ()=>{
    const res = await downloadFile(documentName, documentLocation, cipherKey)
  }

  return (
    <>
      <section
        css={`
          align-items: center;
          margin: 18px 0 18px 0;
          width: 100%;
        `}
      >
        <ProcedureWrapper>
          <div
            css={`
              margin: 18px 0 18px 0;
            `}
          >
            <Title>Created By</Title>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              {createdBy}
            </Text>
          </div>

          <div
            css={`
              margin: 18px 0 18px 0;
            `}
          >
            <Title>Document </Title>
            <Text
              css={`
                ${textStyle('body2')};
                cursor: pointer;
              `}
              onClick = {handleClick}
            >
              {documentName}
              <h2>Download btn</h2>
            </Text>
          </div>
          <div>
            <Title>Selected Language </Title>
            <DropDown
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
                background: '#fff',
              }}
              disabled={true}
              wide
              items={[]}
              placeholder={language}
            />
          </div>

          <div>
            <Title>Selected Arbitration Seat</Title>
            <DropDown
              wide
              disabled={true}
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
                background: '#fff',
              }}
              items={[]}
              placeholder={seat}
            />
          </div>
        </ProcedureWrapper>

        <ProcedureWrapper>
          <Button
            mode='strong'
            onClick={() => {
              console.log('WORKSSSS');
            }}
            css={`
              background: ${theme.selected};
            `}
          >
            Agree and Continue
          </Button>

          <Button
            mode='strong'
            onClick={() => {
              console.log('WORKSSSS');
            }}
            css={`
              background: white;
              color: #637381;
            `}
          >
            Agree and Reject
          </Button>
        </ProcedureWrapper>
      </section>
    </>
  );
}

export default AllProcedureStatements;
