import React, {useEffect, useState} from 'react';
import { DropDown, GU, Text, textStyle, useTheme, Button, Link } from '@aragon/ui';
import styled from 'styled-components';
import {downloadFile} from "../../../../lib/file-storage";
import {getSignature, signDocuments, getSignatureStatus} from "../../../../lib/contracts/SPC";
import {Skeleton} from "antd";

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

function AllProcedureStatements({ seat, language, createdBy, documentLocation, documentName, cipherKey, hash,
                                  account, contractAddress, groupId, node  }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [signStatus, setSignStatus] = useState(false);
  const [userSignStatus, setUserSignStatus] = useState(false)

  useEffect(() => {
    async function getSignatureDetails() {
      try {
        setLoading(true);
        const res = await getSignature(node, contractAddress, groupId, account, hash)
        const {signStatus, userSignStatus} = await getSignatureStatus(res[0], account)
        setSignStatus(signStatus)
        setUserSignStatus(userSignStatus)
        setLoading(false);
      } catch (err) {
        return false;
      }
    }
    getSignatureDetails();
  }, [account]);

  const downloadDoc = async ()=>{
    const res = await downloadFile(documentName, documentLocation, cipherKey)
  }

  const { connect, documentSign} = signDocuments(
    node,
    contractAddress,
    groupId
  )

  const signStatement = async ()=>{
    console.log("SignStatement:::")
    await documentSign(
      hash,
      account,
    )
  }

  return (
    <>
      {loading ? (
        <>
          <Skeleton active/>
          <Skeleton active/>
        </>
      ) : (
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
                <Link external onClick={downloadDoc}> {documentName} </Link>
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

            {! userSignStatus ?
              <>
                <ProcedureWrapper>
                    <Button
                      mode='strong'
                      onClick={signStatement}
                      css={`background: ${theme.selected};`}
                    >
                      Agree
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
                      Reject
                    </Button>
                  </ProcedureWrapper>
              </>
              :null
            }

          </section>
        </>
      )
      }
    </>
  );
}

export default AllProcedureStatements;
