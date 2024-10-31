import axios from "axios";

const Api_Key = 'b8248127d3544109ea806d0e163d1275'
const BaseUrl = 'https://api.themoviedb.org/3'
const trendingMovieEndPoint = `${BaseUrl}/trending/movie/day?api_key=${Api_Key}`
const upcomingMovieEndPoint = `${BaseUrl}/movie/upcoming?api_key=${Api_Key}`
const topratedMovieEndPoint = `${BaseUrl}/movie/top_rated?api_key=${Api_Key}`
const MovieDescriptionEndPoint = id => `${BaseUrl}/movie/${id}?api_key=${Api_Key}`
const MovieCastsEndPoint = id => `${BaseUrl}/movie/${id}/credits?api_key=${Api_Key}`
const SimilarMoviesEndPoint = id => `${BaseUrl}/movie/${id}/similar?api_key=${Api_Key}`

const apiCall = async (endPoint,params)=>{
    const options = {
        method: 'GET',
        url:endPoint,
        params:params?params:{}
    }

    try{

        const res = await axios.request(options) 
        return res

    }catch(err){
        console.log(err);
        return {}
    }
}


export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMovieEndPoint)
}


export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMovieEndPoint)
}

export const fetchTopRatedMovies = ()=>{
    return apiCall(topratedMovieEndPoint)
}

export const fetchMoviedescription = (id)=>{
    return apiCall(MovieDescriptionEndPoint(id))
}

export const fetchMovieCasts = (id)=>{
    return apiCall(MovieCastsEndPoint(id))
}
export const fetchSimilarMovie = (id)=>{
    return apiCall(SimilarMoviesEndPoint(id))
}