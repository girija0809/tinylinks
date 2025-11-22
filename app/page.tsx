import Image from "next/image";
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-purple-200"> 
      <section className="grid grid-cols-1 h-[50vh]">
        <div className=" flex flex-col gap-4 items-center justify-center">
           <p className="text-4xl font-bold">
            The best URL shortner in the market
           </p>
           <p className="px-97 text-center">
            We are the most straightforword URL shortner in the world. Most of the url 
            shortner will track you or ask you to give your details for login. We
            understand your needs and hence we have created this URL shortner.
           </p>
           <li className='flex gap-3 text-white'>
                     <Link href="/shorten"><button className='bg-neutral-500 rounded-lg shadow-lg p-3 py-1 font-blod'>Try Now</button></Link>
                     <Link href="/github"><button className='bg-neutral-500 rounded-lg shadow-lg p-3 py-1 font-blod'>GitHub</button></Link> 
           </li>
        </div>
        
      </section>
    </main>
  );
}
