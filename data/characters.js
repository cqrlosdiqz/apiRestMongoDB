const characters = [
  {
    id: 1,
    username: 'Leela',
    role: 'Capitana',
  },
  {
    id: 2,
    username: 'Fry',
    role: 'Está ahí',
  },
  {
    id: 3,
    username: 'Zoidberg',
    role: 'Médico',
  },
  {
    id: 4,
    username: 'Amy',
    role: 'Científica',
  },
];

exports.characters = {
  getCharacter: () => characters,
  getCharacterByName: (name) => characters.find((el) => el.username === name),
  getCharactersByProfile: (profile) =>
    characters.filter((el) => el.role === profile),
  addNewCharacter: (character) => characters.push(character),
  removeCharacter: (id) =>
    characters.splice(
      characters.findIndex((el) => el.id === id),
      1
    ),
  updateCharacter: ({ id, username, role }) =>
    characters.forEach((el) => {
      if (el.id === parseInt(id)) {
        el.role = role;
        el.username = username;
      }
      return el;
    }),
};
