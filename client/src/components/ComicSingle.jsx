// import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
// import { useOutletContext } from 'react-router-dom'

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
    <section key={comicId} id='single-comic-main'>
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
          const { id, name } = character
          return (
            <div key={id} className='content-div'>
              <p>{name}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}