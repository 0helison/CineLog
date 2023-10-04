import { useState, useEffect } from 'react' 
import MovieCard from '../components/MovieCard'
import './MoviesGrid.css'
 
// importando variáveis do .env
const moviesURL = import.meta.env.VITE_API // url
const apiKey = import.meta.env.VITE_API_KEY // chave

const Home = () => {
  // melhores filmes
  const [topMovies, setTopMovies] = useState([])

  //chamar os melhores filmes via API
  const getTopRateMovies = async (url) => { // async porque vai fazer a req

    const res = await fetch(url) // faz o fetch para receber os dados
    const data = await res.json() // pega os dados que vem e transforma em uma array de objetos js

    setTopMovies(data.results) // results tá no req da API
  }

  //chama a função para que ela execute via useeffect e a req acontece toda vez que recarrega a pag
  useEffect(() => {
    const topRateUrl = `${moviesURL}top_rated?${apiKey}`

    getTopRateMovies(topRateUrl)

  }, [])
  return (
    <div className='container'>
      <h2 className='title'>Best Movies</h2>
      <div className='movies-container'>
      {topMovies.length === 0 && <p>...</p>}
        {topMovies.length > 0 && 
          topMovies.map((movie) => 
          <MovieCard key={movie.id} movie={movie}/>)}
      </div>
    </div>
  )
}

export default Home