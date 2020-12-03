import React, { useCallback, useMemo, useState } from 'react'
import { Header } from '@aragon/ui'

import ArbitrationDetail from './ArbitrationDetail'
import AgreementList from './AgreementList'

import { disputes } from '../../mock-data'
import { arbitrations } from '../../arbitrations-mock-data'

function Agreements() {
  const [selectedDispute, selectDispute] = useSelectedDispute(arbitrations)

  const handleBack = useCallback(() => {
    selectDispute(-1)
  }, [selectDispute])

  return (
    <React.Fragment>
      <Header primary="Arbitrations" />
      {selectedDispute ? (
        <ArbitrationDetail arbitration={selectedDispute} onBack={handleBack} />
      ) : (
        <AgreementList
          disputes={disputes}
          arbitrations={arbitrations}
          selectDispute={selectDispute}
          // filteredDisputes={filteredDisputes}
          // disputeStatusFilter={disputeStatusFilter}
          // handleDisputeStatusFilterChange={handleDisputeStatusFilterChange}
          // disputeAppFilter={disputeAppFilter}
          // handleDisputeAppFilterChange={handleDisputeAppFilterChange}
          // handleClearFilters={handleClearFilters}
          // executionTargets={executionTargets}
        />
      )}
    </React.Fragment>
  )
}

const useSelectedDispute = disputes => {
  const [selectedDisputeId, setSelectedDisputeId] = useState(-1)

  const selectDispute = disputeId => setSelectedDisputeId(disputeId)

  const selectedDispute = useMemo(
    () => disputes.find(dispute => dispute.id === selectedDisputeId) || null,
    [disputes, selectedDisputeId]
  )

  return [selectedDispute, selectDispute]
}

export default Agreements
