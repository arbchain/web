import React, { useContext, useState } from 'react'

const AccountAugmentedContext = React.createContext({
  account: 0,
  changeAccount: () => {},
})

function useAccountAugmented() {
  return useContext(AccountAugmentedContext)
}

function AccountAugmented({ children }) {
  const [account, setaccount] = useState(0)

  // Call back context function to update the selected account
  function changeAccount(value) {
    setaccount(value)
  }

  return (
    <AccountAugmentedContext.Provider
      value={{ account: account, changeAccount: changeAccount }}
    >
      {children}
    </AccountAugmentedContext.Provider>
  )
}

function AccountProvider({ children }) {
  return <AccountAugmented>{children}</AccountAugmented>
}

export { useAccountAugmented as useAccount, AccountProvider }
