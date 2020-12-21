export const roles = { 'claimant': 0, 'respondant': 1 , 'arbitrator': 2, 'court': 3, 'witness': 4 };
export const stages = [{
    name: 'creation',
    actions: { 'create': [0, 1, 2] }
},
{
    name: 'response',
    actions: { 'respond': [1] }
},
{
    name: 'updates',
    actions: { 'statement': [0, 1] }
},
];