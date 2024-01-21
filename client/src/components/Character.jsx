import { Link, useLoaderData } from "react-router-dom"

export default function Character(){

  const characterInfo = useLoaderData()
  console.log(characterInfo.charInfo)
// characterInfo.comicInfo map through
  const { id: charId, name, image } = characterInfo.charInfo

  return (
    <section key={charId} className='single-comic-main'>
      <section className='single-page-top character-top'>
        <div className='single-page-image character' style={{ backgroundImage: `url(${image})` }}></div>
        <div className='single-page-information' id="character-single-name">
          <h2 className='single-page-title'>{name}</h2>
          {/* <p className='single-page-description'>{description}</p> */}
        </div>
      </section>
      <div className='single-page-linked-content'>
        {characterInfo.comicInfo.map(comic => {
          const { id, title, artwork, release_date } = comic
          return (
            <Link key={id} id={id} to={`/comics/${id}`} className='all-comics-section content-div' >
              <div className='all-comics-image' style={{ backgroundImage: `url(${artwork})` }}>
              </div>
              <div className='all-comics-info-div'>
                <p>{title}</p>
                <p>{release_date.split('-').shift(0,1)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}