import { Link, useLoaderData } from 'react-router-dom'

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
    <section key={comicId} className='single-comic-main'>
      <section className='single-page-top'>
        <div className='single-page-image' style={{ backgroundImage: `url(${artwork})` }}></div>
        <div className='single-page-information'>
          <h2 className='single-page-title'>{title}</h2>
          {authors.map(author => {
            const { id, name } = author
            return (
              <div key={id} id='authors-div'>
                <p className='single-page-names'>{name}</p>
              </div>
            )
          })}
          <p className='single-page-names'>{artist}</p>
          <p className='single-page-date'>{release_date.split('-').reverse().slice(1).join(' - ')}</p>
          <p className='single-page-description'>{description}</p>
        </div>
      </section>
      <div className='single-page-linked-content'>
        {characters.map(character => {
          const { id, name, image } = character
          return (
            <div key={id} className="char-background-single">
              <Link id={id} to={`/characters/${id}`} className='single-shelf-comic' >
                <div className='home-char-image single-page' style={{ backgroundImage: `url(${image})` }}>
                </div>
                <div className='all-comics-info-div'>
                  <p>{name}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}