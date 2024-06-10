import {  DropletIcon,  Thermometer, Wind } from "lucide-react"
import Image from "next/image"
import {DateTime} from 'luxon'
import { NeonGradientCard } from "./ui/neon-gradient-card"

type Props = {}
const WeatherStats = ({data}:any) => {
  const formatToLocalTime=(sec:number,offset:number,format:string)=>{
    return DateTime.fromSeconds(sec+offset,{zone:'utc'}).toFormat(format)
   }
   const sunrise=formatToLocalTime(data.sys.sunrise,data.timezone,"hh:mm a")
   const sunset=formatToLocalTime(data.sys.sunset,data.timezone,"hh:mm a")

  return (
    <>
    <div className="w-[40rem]  flex flex-wrap  items-center justify-around text-xl mt-12 md:flex-row flex-col gap-6  ">
      <Image src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" width={100} height={100} />
      <div className="flex flex-col">
        <p className="font-bold text-primary text-[3rem]">{data.main.temp.toFixed(0)}℃</p>
        <p className="text-primary text-[2rem] mt-4">{data.weather[0].main}</p>
      </div>

      <div className="flex flex-col items-center gap-2   ">
        <div className="flex  ">
          <Thermometer/>
         <p>Feels like : {data.weather[0].main}</p>
        </div>
        <div className="flex ">
          <DropletIcon/>
         <p>Humidity : {data.main.humidity} %</p>
        </div>
        <div className="flex">
          <Wind/>
         <p>Wind : {data.wind.speed.toFixed()}km/h</p>
        </div>
      </div>
    </div>
      {/* Neon gradient :sunrise sunset high&low */}
     <div className="flex md:flex-row flex-col items-center gap-8 mt-12">
      <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <div className="flex gap-1 pointer-events-none z-10 h-full whitespace-pre-wrap font-bold ">
            <Image src={'/sunrise.png'} alt="cloudy" width={50} height={50}/>
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-4xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Sunrise {sunrise}
      </span>
         
      </div>
     </NeonGradientCard>

     <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <div className="flex gap-1 pointer-events-none z-10 h-full whitespace-pre-wrap font-bold ">
            <Image src={'/sunset.png'} alt="cloudy" width={50} height={50}/>
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-4xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Sunset {sunset}
      </span>
         
      </div>
     </NeonGradientCard>

     <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <div className="flex gap-1 pointer-events-none z-10 h-full whitespace-pre-wrap font-bold ">
            <Image src={'/high-temperature.png'} alt="cloudy" width={50} height={50}/>
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-4xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          High Temp {data.main.temp_max.toFixed()}°
      </span>
         
      </div>
     </NeonGradientCard>

     <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <div className="flex gap-1 pointer-events-none z-10 h-full whitespace-pre-wrap font-bold ">
            <Image src={'/low-temperature.png'} alt="cloudy" width={50} height={50}/>
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-4xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
         Low Temp {data.main.temp_min.toFixed()}°
      </span>
      </div>
     </NeonGradientCard>
     </div>

    </>
  )
}
export default WeatherStats