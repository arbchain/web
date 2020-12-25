import React, {useEffect, useState} from 'react';
import { Text, Link} from '@aragon/ui';

import SectionWrapper, { GridGroup, SubmittedResponse } from './styles';
import {downloadFile} from "../../../lib/file-storage";

function ArbitrationResponse({ responseDetail, fileDetails }) {
  console.log("response:", responseDetail)

  const download = async ()=>{
    const res = await downloadFile(fileDetails.fileName, fileDetails.fileLocation,
      fileDetails.cipherKey)
  }

  return (
    <>
      <SubmittedResponse>
        <div className='heading-container'>
          <h2 className='title__heading'>Submitted Response</h2>
          <h1>Submitted On -Date-</h1>
        </div>

        <div className='summary'>
          <h2>Summary</h2>
          <Text className='description' style={{ fontSize: '16px' }}>
            {/* {details[1]} */}
            {responseDetail[0].description}
          </Text>

          <GridGroup>
            <div className='attachment'>
              <h2>Attached Documents</h2>
              <Text className='description mb-6'>
                {/* {details[1]} */}
                <Link external onClick={download}>{fileDetails.fileName}</Link>
              </Text>
            </div>
          </GridGroup>
        </div>
      </SubmittedResponse>
    </>
  );
}

export default ArbitrationResponse;
