'use client'
import Loader from "@/components/Loader"
import TimeLocation from "@/components/TimeLocation"
import WeatherStats from "@/components/WeatherStats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ShineBorder from "@/components/ui/shine-border"
import {  Navigation } from "lucide-react"
import {  useRef, useState } from "react"
const BASE_URL="https://api.openweathermap.org/data/2.5/weather?"
const API_KEY=process.env.NEXT_PUBLIC_WEATHER_KEY
const CITIES=['Mumbai','japan','Colombo','HongKong']
type Props = {}
const Page = (props: Props) => {
  const[city,setCity]=useState('')
  const[data,setData]=useState({})
  const[error,setError]=useState('')
  const[isLoading,setIsLoading]=useState(false)
  const inputRef=useRef<HTMLInputElement>(null)
  //HandleForm submission
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(city===''){
      inputRef.current?.focus()
      return;
    }
    setIsLoading(true)
    try{
      const response=await fetch(`${BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`)
      if(!response.ok){
        throw new Error()
      }
      const data=await response.json()
      console.log(data)
      setData(data)
      setError('')
      
    }catch(err){
      setError('City not Found.Please enter valid city name or Zip Code')
      setData({})
    }
    finally{
      setIsLoading(false)
    }
  }
 
//handle GeoLocation
  const handleGeoLocations=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (success)=>{
          const{longitude,latitude}=success?.coords
          fetchWeatherCoordinates(latitude,longitude)
        },
        (error)=>{
          setError('Location access is blocked. To get the most accurate weather, please enable location services in your browser settings')
        }
      )
    }else{
      setError('Geolocation is not supported in your browser please search manually!')
    }
  }
  //fetch Weather by coordinates
  const fetchWeatherCoordinates=async(latitude:number,longitude:number)=>{
    setIsLoading(true)
    const res=await fetch(`${BASE_URL}lat=${latitude}&lon=${longitude}&units=metric&APPID=${API_KEY}`)
    if(!res.ok)
      throw new Error('Error fetching Data')
    try{
      const data=await res.json()
      setData(data)
      setError('')
    }catch(err){
      setError('Failed to fetch your current Location')
    }
    finally{
      setIsLoading(false)
    }
  }
  //handle multiple cities
  const handleMultipleLocations=async(city:string)=>{
    setIsLoading(true)
    const response=await fetch(`${BASE_URL}q=${city}&units=metric&APPID=${API_KEY}`)
    if(!response.ok){
      throw new Error('Error fetching data')
    }
    try{
      const data=await response.json()
      console.log(data)
      setData(data)
      setError('')
      
    }catch(err){
      setError('City not Found.Please enter valid city name or Zip Code')
      setData({})
    }
    finally{
      setIsLoading(false)
    }
  }

  if(isLoading) {
  return <Loader/>
  }
  return (
    <>
    <div className="p-20">
      <div className="flex items-center justify-center gap-2 sm:gap-12   m-8  ">
        {CITIES.map((city)=>(
          <ShineBorder className="text-center text-lg font-bold capitalize  " color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} >
            <button  onClick={()=>{
              handleMultipleLocations(city)
            }}>
              {city}
            </button>
          </ShineBorder>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 ">
      {/*  input form submission */}
          <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
          <Input value={city} ref={inputRef}  type="text"placeholder="enter city name or zip code" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCity(e.target.value)} />
          <Button type="submit">Search</Button>
          </form>
          <Button onClick={handleGeoLocations}>
          <Navigation  />
          </Button>
      </div>
     
      
      {Object.keys(data).length===0 && error===""?
      <div className="text-center  h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4"><span className="text-primary">Welcome</span> to Cloud Catcher</h2>
        <p className="text-xl">Enter a city name or zip code to get Accurate weather report</p>
      </div>
      :error ?
      <div >
        <p className="text-center  text-red-600 font-bold text-2xl m-[5rem]  ">{error}</p>
      </div>
      :<>
        <div className="flex items-center justify-center flex-col">
        <TimeLocation data={data}/>
        <WeatherStats data={data}/>
        </div>
      </>}
    </div>
    </>
  )
}
export default Page