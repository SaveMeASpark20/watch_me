import { useEffect, useState } from "react";

interface Movies {
  id: string,
  title: string,
  url : string,
  poster? : string
}

const Videos = () => {

  
   const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    async function fetchData() {

      try {
        const response = await fetch("http://localhost:3000/api/movies");
        
        const getMovies = await response.json();
        setMovies(getMovies);
      
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      
    }
    fetchData()
  }, [])


  return (
    <div className="flex gap-3">
    {movies.map(movie => {
      console.log(movie)
      return(
        
          <video className="lazy"  controls preload={movie.poster? movie.poster : ""} key={movie.id} width={400} height={350}>
            <source src={movie.url} type="video/mp4" />
          </video>
      )
    })}
    </div>
  )
}
  
  export default Videos