import { useLoaderData } from 'react-router-dom'

export default function ComicSingle(){

  // Loaders
  const singleComic = useLoaderData()

  const { 
    id: comicId, 
    artwork, 
    artist,
    description,
    title, 
    release_date,
    characters,
    authors, 
  } = singleComic

  return (
    <>
      <h1>ComicSingle</h1>
      <div key={comicId}>
        <p>{artwork}</p>
        <p>{title}</p>
        {authors.map(author => {
          const { id, name } = author
          return (
            <div key={id}>
              <p>{name}</p>
            </div>
          )
        })}
        <p>{artist}</p>
        <p>{release_date}</p>
        <p>{description}</p>
        {characters.map(character => {
          const { id, name } = character
          return (
            <div key={id}>
              <p>{name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}