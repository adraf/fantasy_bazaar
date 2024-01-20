import { Link, useLoaderData } from "react-router-dom"


export default function Home(){

  // const [mainUserInfo, setMainUserInfo] = useOutletContext() 
  // const navigate = useNavigate()
  const tenRandomComics = useLoaderData()


  return (
    <section id='home-main'>
      <section id="comic-case">
        <section className='comic-both-shelves'>
            {tenRandomComics.map(comic => {
              const { id: comicId, artwork } = comic
              return (  
                <div key={comicId} className="comic-background-single" style={{ backgroundImage: `url(${artwork})` }}>
                  <Link id={comicId} to={`/comics/${comicId}`} className='single-shelf-comic' >
                    <div className='home-comics-image' style={{ backgroundImage: `url(${artwork})` }}>
                    </div>
                  </Link>
                </div>
              )
            })}
          </section>
          <svg className="comic-line-top" height="4">
            <line x1="0vw" y1="20%" x2="100vw" y2="20%" style={{ stroke: 'white', strokeWidth: '3' }} />
          </svg>
          <svg className="comic-line-bottom" height="4">
            <line x1="0vw" y1="70%" x2="100vw" y2="70%" style={{ stroke: 'white', strokeWidth: '3' }} />
          </svg>
        <section className="home-character-list">
          {/* map 6 characters */}
        </section>
      </section>
    </section>
  )
}