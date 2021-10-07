const { Router } = require('express');
const router = Router();

const { characters } = require('../data/characters');

router.get('/', (req, res) => {
  const data = characters.getCharacter();
  res.send(data);
});

router.get('/name/:name', (req, res) => {
  const { name } = req.params;
  const data = characters.getCharacterByName(name);
  res.send(data);
});

router.get('/profile/:profile', (req, res) => {
  const { profile } = req.params;
  const data = characters.getCharactersByProfile(profile);
  res.send(data);
});

router.post('/new', (req, res) => {
  const { id, username, role } = req.body;
  characters.addNewCharacter({ id: parseInt(id), username, role });
  res.send('Saved');
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  characters.removeCharacter(parseInt(id));
  res.send('Deleted');
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const dataUpdate = { id: parseInt(id), ...req.body };
  characters.updateCharacter(dataUpdate);
  res.send('Updated');
});

module.exports = router;
