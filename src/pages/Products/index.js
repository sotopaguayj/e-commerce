import ProducsList from '../../components/ProductsList'
import RemoveCookie from '../../hooks/removeCookie'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/modal/modal'
import { useSelector } from 'react-redux'
import GetCookie from '../../hooks/getCookie'

function Index() {
  const auth = GetCookie('token')
  const itemsTotal = useSelector(state => state.total)

  const [name, setName] = useState('')
  const [limit, setLimit] = useState(20)
  const [load, setLoad] = useState(false);
  const [value, setValue] = useState([]);
  const [log, setLog] = useState(true)
  const [see, setSee] = useState(false)
  const [page, setPage] = useState({
    pos: 1,
    ofset: 0,
  })
  const navigate = useNavigate()

  let URL = `https://api.escuelajs.co/api/v1/products?offset=${page.ofset}&limit=${limit}&title=${name}`

  const showCart = ()=>{
    setSee(!see)
  }

  const login = () =>{
    navigate('/login')
  }

  const changeName = (e) =>{
    setName(e.target.value)
  }
  const nextPage = () =>{
   if(value.length > 0)
    setPage({
    pos: page.pos += 1,
    ofset: page.ofset + 20,
   })
  }
  const prevPage = () =>{
   if(page.pos > 1){
    setPage({
      pos: page.pos -= 1,
      ofset: page.ofset - 20, 
    })
   }
  }
  const logOut = () =>{
    Swal.fire({
      title: 'you are logging out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#115e59',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
      background: '#27272a',
      color: '#FFF',
    }).then((result) => {
      if (result.isConfirmed) {
        setLog(false)
        RemoveCookie('token')
        navigate('/login')
      }
    })
  }

  useEffect(()=>{
    setLoad(true)
    async function getValues(){
      fetch(URL)
      .then((response) => response.json())
      .then((data) => setValue(data))
      .catch((err) => console.log(err))
      .finally(()=> setLoad(false))
    }
    getValues()
  },[name, page, log, limit])

  return (
    <div className=''>
      <div className='grid grid-cols-3 items-center  justify-items-center bg-teal-800 h-16 px-5'>
        <span onClick={()=>{navigate('/')}} className='cursor-pointer text-4xl font-bold text-teal-600'>E-Commerce</span>
        <input onChange={changeName} className='bg-teal-900 rounded-md p-2 outline-none text-white text-xl' type='text' />
        {
        auth?
        <div className='flex gap-5'>
          <button onClick={showCart} className={`flex justify-center items-center relative  px-5 rounded-md ${see ? 'bg-teal-600 text-zinc-900' : 'text-white bg-teal-900'} hover:bg-teal-600 transition hover:text-zinc-900 h-10`}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
            {
              itemsTotal.items !== 0 
              ?<div className='absolute flex justify-center items-center top-0 right-0 rounded-full h-4 w-4 bg-white'>
                <small className='text-teal-900 font-semibold'>{itemsTotal.items}</small>
              </div>
              : ''
            }
          </button>

          <button onClick={logOut} className='bg-teal-900 px-5 rounded-md text-white hover:bg-teal-600 transition hover:text-zinc-900'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          </button>
        </div>
        :
        <button onClick={login} className='bg-teal-900 px-5 py-2 rounded-md text-white hover:bg-teal-600 transition hover:text-zinc-900'>LogIn</button >
        }
      </div>

      <div className='w-full py-3 flex justify-center items-center'>
        <div className='grid grid-cols-3 justify-items-center items-center'>
          <button onClick={prevPage} className='bg-teal-600 rounded '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className='text-white text-xl'>{page.pos}</span>
          <button onClick={nextPage} className='bg-teal-600 rounded '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      {load 
      ? <div className='h-screen flex justify-center items-center'>
          <div class="flex items-center justify-center space-x-2">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-teal-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        </div> 
      :
      value.length != 0 
      ?  <ProducsList list={value} />
      : <div className='w-full text-2xl grid place-content-center text-teal-600'>Not Found</div>
      }

      <Modal display={see ? true : false}/>
    </div>
  )
}

export default Index