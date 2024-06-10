'use client'
import TimeLocation from "@/components/TimeLocation"
import WeatherStats from "@/components/WeatherStats"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"


type Props = {}
const Page = (props: Props) => {
  const[data,setData]=useState({})
  const[city,setCity]=useState('')
  const[error,setError]=useState('')

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
 
  
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      const response=await fetch(url)
      if(!response.ok){
        throw new Error()
      }
      const data=await response.json()
      console.log(data)
      setData(data)
      setError('')
    }catch(err){
      setError("City not found!")
      setData({})
    }
  }
   
 
  return (
    <>
    <div className="p-28">
      {/*  input form submission */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
      <Input type="text"placeholder="enter city name or zip code" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCity(e.target.value)} />
      <Button type="submit">Search</Button>
      </form>

      {Object.keys(data).length===0 && error===""?
      <div className="text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4"><span className="text-primary">Welcome</span> to Cloud Catcher</h2>
        <p className="text-xl">Enter a city name or zip code to get Accurate weather report</p>
      </div>
      :error !==""?
      <div className="text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4">
          <span className="text-primary">City</span> not found</h2>
        <p className="text-xl">Please enter valid city name or zip code</p>
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