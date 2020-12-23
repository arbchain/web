import React, { useContext, useState } from 'react';

const MetaDataContext = React.createContext({
  arbitrationMetadata: [],
  agreementMetadata: [],
  changeArbitrationMetaData: () => [],
  changeAgreementMetaData: () => [],
});

function useMetaDataAugmented() {
  return useContext(MetaDataContext);
}

function MetaDataAugmented({ children }) {
  const [arbitrationMetadata, setArbitrationMetaData] = useState([]);
  const [agreementMetadata, setAgreementMetaData] = useState([]);

  // Call back context function to update the selected account
  function changeArbitrationMetaData(value) {
    setArbitrationMetaData(value);
  }
  function changeAgreementMetaData(value) {
    setAgreementMetaData(value);
  }

  return (
    <MetaDataContext.Provider
      value={{
        arbitrationMetadata: arbitrationMetadata,
        agreementMetadata: agreementMetadata,
        changeArbitrationMetaData: changeArbitrationMetaData,
        changeAgreementMetaData: changeAgreementMetaData,
      }}
    >
      {children}
    </MetaDataContext.Provider>
  );
}

function MetaDataProvider({ children }) {
  return <MetaDataAugmented>{children}</MetaDataAugmented>;
}

export { useMetaDataAugmented as useMetaData, MetaDataProvider };
