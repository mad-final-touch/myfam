export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  relation: string;
  color: string;
}

export const familyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'M',
    relation: 'Mother',
    color: '#128C7E', // Teal
  },
  {
    id: '2',
    name: 'Dad',
    avatar: 'D',
    relation: 'Father',
    color: '#128C7E', // Teal
  },
  {
    id: '3',
    name: 'Sister',
    avatar: 'S',
    relation: 'Sister',
    color: '#128C7E', // Teal
  },
  {
    id: '4',
    name: 'Brother',
    avatar: 'B',
    relation: 'Brother',
    color: '#128C7E', // Teal
  },
  {
    id: '5',
    name: 'Grandma',
    avatar: 'G',
    relation: 'Grandmother',
    color: '#128C7E', // Teal
  },
];

// Helper function to get a family member by ID
export const getFamilyMemberById = (id: string): FamilyMember | undefined => {
  return familyMembers.find(member => member.id === id);
};

// Helper function to get a family member by name
export const getFamilyMemberByName = (name: string): FamilyMember | undefined => {
  return familyMembers.find(member => member.name === name);
}; 