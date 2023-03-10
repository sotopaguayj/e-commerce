import {useForm} from 'react-hook-form';
import {useNavigate, Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import SetCookie from '../../hooks/setCookie'

function Index() {
  const location = useLocation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { register, handleSubmit, formState:{errors} } = useForm();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  const setData = (data) =>{
    
    if(data.user.trim() === 'admin' && data.pass.trim() === '123'){
      SetCookie('token','asd')
      if(location.state === 'index'){
        navigate('/products')
      }else{
        navigate("/")
      }
    }else{
      Swal.fire({
        text:'🔴 Wrong Data',
        toast: true,
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#27272a',
        color: '#FFF',
        position: 'top-end'
      })
    }
  }
  return (
    <div className='bg flex h-screen w-full bg-dark justify-center items-center'> 
      <div className='flex flex-col justify-center items-center gap-5 rounded-lg px-10 py-5'>
        <div className='flex w-full justify-center items-center'>
          <span className='font-bold text-4xl text-teal-700'>
            LOGIN
          </span>
        </div>
        <form 
          className='flex flex-col gap-4' 
          autoComplete='off'
          onSubmit={handleSubmit(setData)}
          >
          <div className='relative flex pb-6 pt-6 flex-col'>
            <input 
              className='peer/user bg-zinc-800 text-white border-zinc-800 transition border-4 rounded-lg  px-2 py-1 text-xl focus:border-teal-700  outline-none' 
              type='text' 
              id='user'
              {...register('user', {
                required: true,
                pattern: /^[a-zA-Z ]*$/i,
              })}/>
              {errors.user?.type === 'required' && <small className='absolute text-red-900 bottom-0  font-semibold '>User Required</small> }
              {errors.user?.type === 'pattern' && <small className='absolute text-red-900 bottom-0 font-semibold '>invalid user</small> }
            <label 
              className='transition text-gray peer-focus/user:text-teal-700 font-semibold text-zinc-700 top-0 absolute'
              htmlFor='password'>
              Username
            </label>
          </div>
          <div className='relative flex pb-6 pt-6 flex-col'>
            <input 
              className='peer/pass bg-zinc-800 text-white border-zinc-800 transition border-4 rounded-lg  px-2 py-1 text-xl  focus:border-teal-700 outline-none' 
              type='password' 
              id='pass'
              {...register('pass',{
                required: true,
              })}/>
              {errors.pass?.type === 'required' && <small className='absolute text-red-900 bottom-0 0 font-semibold '>Pass Required</small> }
            <label 
              className='transition text-zinc-700 peer-focus/pass:text-teal-700 font-semibold  absolute top-0'
              htmlFor='password'>
            Password
            </label>
          </div>
          <div className='flex justify-center items-center'>
            <button className=' bg-teal-700 text-zinc-900 text-2xl hover:opacity-80 font-semibold px-3 py-1 rounded-lg transition '>
              Access
            </button>
          </div>
        </form>
        <div>
          <Link 
            className='transition text-zinc-700 text-md font-semibold hover:text-teal-700' 
            >
            I can't Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index