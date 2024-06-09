import { ArrowBigDown, ArrowBigUp, DropletIcon, Sunrise, Sunset, Thermometer, Wind } from "lucide-react"
import Image from "next/image"
import {DateTime} from 'luxon'

type Props = {}
const WeatherStats = ({data}:any) => {
  const formatToLocalTime=(sec:number,offset:number,format:string)=>{
    return DateTime.fromSeconds(sec+offset,{zone:'utc'}).toFormat(format)
   }
   const sunrise=formatToLocalTime(data.sys.sunrise,data.timezone,"hh:mm a")
   const sunset=formatToLocalTime(data.sys.sunset,data.timezone,"hh:mm a")

  return (
    <>
    <p className="text-primary text-[2rem] mt-4">{data.weather[0].main}</p>
    <div className="w-[40rem]  flex flex-wrap  items-center justify-around text-xl mt-12   ">
      <Image src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" width={100} height={100} />
      <p className="font-bold text-primary text-[3rem]">{data.main.temp.toFixed(0)}℉</p>

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
      {/* sunrise sunset high&low */}
      <div  className="w-[50rem]  flex items-center justify-around text-xl mt-16 gap-4 ">
        <div className="flex ">
          <Sunrise/>
            <p>Sunrise : {sunrise}</p>
        </div>
        <div className="flex">
          <Sunset/>
          <p>Sunset : {sunset}</p>
        </div>
        <div className="flex">
          <ArrowBigUp/>
          <p>High : {data.main.temp_max.toFixed()}°</p>
        </div>
        <div className="flex">
          <ArrowBigDown/>
          <p>Low:{data.main.temp_min.toFixed()}°</p>
        </div>
      

    </div>
    </>
  )
}
export default WeatherStats