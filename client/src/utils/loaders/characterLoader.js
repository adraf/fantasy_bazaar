import axios from 'axios';

export async function getAllCharacters() {
  const res = await axios.get(`/api/characters/`)
  res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
  return res.data
}

export async function getAllAuthors() {
  const res = await axios.get(`/api/authors/`)
  res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
  return res.data
}

export async function getIndCharacter(id) {
  const res = await axios.get(`/api/characters/${id}/`)
  console.log(res.data)
  return res.data
}

export async function homeCharsSix() {
  try {
    const res = await axios.get('/api/characters/')
    const allChars = res.data
    const listChar = []
    listChar.push(allChars.filter(charsAll => charsAll.id === 7))
    listChar.push(allChars.filter(charsAll => charsAll.id === 8))
    listChar.push(allChars.filter(charsAll => charsAll.id === 2))
    listChar.push(allChars.filter(charsAll => charsAll.id === 3))
    listChar.push(allChars.filter(charsAll => charsAll.id === 40))
    listChar.push(allChars.filter(charsAll => charsAll.id === 4))
    return listChar.flat()
  } catch (error) {
    console.log(error)
  }
}
