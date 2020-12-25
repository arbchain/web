export const roles = ['claimant', 'respondant', 'arbitrator', 'court', 'witness'];
export const stages = [
  'response',
  'nomination',
  'hearing',
  'tribunal_formation',
  'challenge_arbitrator',
  'witness',
  'award',
];

export const actions = {
  claimant: {
    creation: 'create',
    nomination: 'nominate',
    challenge_arbitrator: 'challenge',
    hearing: 'statement',
    witness: 'nominate',
  },
  respondant: {
    creation: 'create',
    response: 'respond',
    nomination: 'nominate',
    challenge_arbitrator: 'challenge',
    hearing: 'statement',
    witness: 'nominate',
  },
  arbitrator: {
    creation: 'create',
    hearing: 'initiate',
  },
  court: {
    tribunal_formation: 'appoint',
  },
  witness: {
    witness: 'statement',
  },
};
