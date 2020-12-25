export const roles = ['claimant', 'respondant', 'arbitrator', 'court', 'witness'];
export const stages = ['creation', 'response', 'updates'];

export const actions = {
  claimant: {
    creation: 'create',
    updates: 'statement',
  },
  respondant: {
    creation: 'create',
    response: 'respond',
    updates: 'statement',
  },
  arbitrator: {
    creation: 'create',
  },
};
