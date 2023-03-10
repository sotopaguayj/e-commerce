import { useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate()
  const goHome = () =>{
    navigate('/')
  }
  return (
    <div className='h-screen w-full flex justify-center items-center flex-col'>
      <span className=" text-9xl text-teal-600 animate-pulse">404</span>
      <div className='text-4xl flex gap-2'>
        <span className='text-red-500 font-semibold'>Oops!</span>
        <span className='text-white'>Page not Found</span>
      </div>
      <span className='text-zinc-500'>the page you're  looking doesn't exist.</span>
      <button onClick={goHome} className='px-5 py-2 bg-teal-600 my-5 rounded-md hover:opacity-80 transition'>Go home</button>
    </div>
  )
}

export default NotFound