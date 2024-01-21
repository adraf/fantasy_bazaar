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
