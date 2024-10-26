import './Home.css'
import search from '../../assets/img/search.png'
import info from '../../assets/img/info_outline.png'
import center from '../../assets/img/rafiki.png'
import add from '../../assets/img/add.png'

export default function Home() {
    return (
        <main className='home'>
            <header className='container-home'>
                <div className='card-home'>
                    <div className='text-card-home'>
                        <h1>Notes</h1>
                    </div>
                    <div className='img-card-home'>
                        <div>
                            <img src={search} alt="Search" />
                        </div>
                        <div>
                            <img src={info} alt="info" />
                        </div>
                    </div>
                </div>
            </header>
            <article className='container-note'>
                <img src={center} alt="" />
                <h2>Create your first note!</h2>
            </article>
            <footer className='container-add'>
                <div>
                    <img src={add} alt="" />
                </div>
            </footer>
        </main>
    )
}