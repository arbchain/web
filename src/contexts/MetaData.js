import React, { useContext, useState } from 'react';

const MetaDataContext = React.createContext({
  metadata: [],
  changeMetaData: () => [],
});

function useMetaDataAugmented() {
  return useContext(MetaDataContext);
}

function MetaDataAugmented({ children }) {
  const [metadata, setMetaData] = useState([]);

  // Call back context function to update the selected account
  function changeMetaData(value) {
    setMetaData(value);
  }

  return (
    <MetaDataContext.Provider value={{ metadata: metadata, changeMetaData: changeMetaData }}>
      {children}
    </MetaDataContext.Provider>
  );
}

function MetaDataProvider({ children }) {
  return <MetaDataAugmented>{children}</MetaDataAugmented>;
}

export { useMetaDataAugmented as useMetaData, MetaDataProvider };
