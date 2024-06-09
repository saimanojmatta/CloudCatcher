import Image from "next/image"
import { ModeToggle } from "./ui/Model-toggle"
import Link from "next/link"

type Props = {}
const Navbar = (props: Props) => {
  return (
    <nav className="flex items-center justify-between fixed z-50 w-full px-6 py-6 lg:px-10 border-b[1px]">
      <Link href='/' className="flex items-center gap-1">
     <Image src="/cloudy.png" alt="XOOM logo"   className="max-sm:size-10" width={32} height={32} />
    <p className="text-[26px] font-extrabold  max-sm:hidden text-primary ">CloudCatcher</p>
    </Link>
      <ModeToggle/>
    </nav>

   
  )
}
export default Navbar
