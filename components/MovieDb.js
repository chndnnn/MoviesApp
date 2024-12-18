import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Api_Key = 'b8248127d3544109ea806d0e163d1275'
const BaseUrl = 'https://api.themoviedb.org/3'
// const trendingMovieEndPoint = `${BaseUrl}/trending/movie/day?api_key=${Api_Key}`
const trendingMovieEndPoint = `${BaseUrl}/discover/movie?api_key=${Api_Key}&with_original_language=hi&sort_by=popularity.desc`
const upcomingMovieEndPoint = `${BaseUrl}/movie/upcoming?api_key=${Api_Key}&with_original_language=hi`
const topratedMovieEndPoint = `${BaseUrl}/movie/top_rated?api_key=${Api_Key}`
const MovieDescriptionEndPoint = id => `${BaseUrl}/movie/${id}?api_key=${Api_Key}`
const MovieCastsEndPoint = id => `${BaseUrl}/movie/${id}/credits?api_key=${Api_Key}`
const SimilarMoviesEndPoint = id => `${BaseUrl}/movie/${id}/similar?api_key=${Api_Key}`
const castDetailsEndPoint = id => `${BaseUrl}/person/${id}?api_key=${Api_Key}`
const personsMoviesEndPoint = id => `${BaseUrl}/person/${id}/movie_credits?api_key=${Api_Key}`
const searchedMoviesEndPoint = searchedText => `${BaseUrl}/search/movie?query=${searchedText}&api_key=${Api_Key}`

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


export const fetchUpcomingMovies = (params)=>{
    return apiCall(upcomingMovieEndPoint,params)
}

export const fetchTopRatedMovies = (params)=>{
    return apiCall(topratedMovieEndPoint,params)
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
export const fetchPersonDetails = (id)=>{
    return apiCall(castDetailsEndPoint(id))
}

export const fetchPersonMovies = (id)=>{
    return apiCall(personsMoviesEndPoint(id))
}

export const fetchSearchedMovies = (searchedText)=>{
    return apiCall(searchedMoviesEndPoint(searchedText))
}

export const storedata = async (key,value)=>{
    try{
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue);
    }catch(e){
        console.warn("Unable to add to favourite")
    }
}

export const getData = async (key)=>{
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue):[]
    }catch(e){
        console.log(e)
    }
}

export const removeItem = async (id)=>{
    try{
        const myData = await getData("FAVORITES_KEY") || [];
        const newData = myData?.filter(myid=>myid != id)
        await storedata("FAVORITES_KEY",newData)
    }catch(e){
        console.log(e)
    }
}

export const removeCompletely = async ()=>{
    await AsyncStorage.removeItem("FAVORITES_KEY")
}

