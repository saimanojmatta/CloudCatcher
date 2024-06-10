import {DateTime} from 'luxon'

const TimeLocation = ({data}:any) => {
  const formatToLocalTime=(sec:number,offset:number,format= "cccc, dd LLL yyyy' | Local time: 'hh:mm a ")=>{
   return DateTime.fromSeconds(sec+offset,{zone:'utc'}).toFormat(format)
  }
  const formatLocalTime=formatToLocalTime(data.dt,data.timezone)
  return (
    <>
    <div className='flex items-center justify-center mt-12 text-xl font-bold flex-col gap-8  '>
      {formatLocalTime}
      <p className='font-medium text-4xl text-primary '>{data.name}, {data.sys.country}</p>
    </div>
    </>
  )
}
export default TimeLocation
