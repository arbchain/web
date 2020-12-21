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
    name: 'nomination',
    actions: { 'nominate': [0, 1], 'challenge': [0, 1], 'appoint': [3] }
},
{
    name: 'hearing',
    actions: { 'statement': [0, 1], 'initiate': [2] }
},
{
    name: 'witiness',
    actions: {'nominate': [0, 1], 'statement': [4] }
},
{
    name: 'award',
    actions: {'announce': [2] }
}];