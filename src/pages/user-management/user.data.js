export const columnsUser = [
  {
    name: 'Type of user',
    selector: (row) => row.freelancer_type,
  },
  {
    name: 'Phone',
    selector: (row) => row.phone_number,
  },
  // {
  //   name: 'Language',
  //   selector: (row) => row.language,
  // },
  {
    name: 'ID',
    selector: (row) => row.personal_id,
  },

  {
    name: 'Company',
    selector: (row) => row.company_name,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
  },
  {
    name: 'Name',
    selector: (row) => row.full_name,
  },
]

export const dataUser = [
  {
    key: 1,
    type: 'Free lancer',
    phone: '0394925155',
    language: 'En',
    id: '66677',
    company: 'Just.engineer',
    email: 'hihi@gmail.com',
    name: 'John Brown sr.',
  },
  {
    key: 12,
    type: 'Free lancer',
    phone: '0394925155',
    language: 'En',
    id: '66677x',
    company: 'Just.engineer',
    email: 'hihi@gmail.com',
    name: 'John Brown sr.',
  },
  {
    key: 13,
    type: 'Free lancer',
    phone: '0394925155',
    language: 'En',
    id: '6667a7',
    company: 'Just.engineer',
    email: 'hihi@gmail.com',
    name: 'John Brown sr.',
  },
]
