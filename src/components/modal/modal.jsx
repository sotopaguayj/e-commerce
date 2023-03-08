import { useSelector, useDispatch } from "react-redux"
import { deleteItem,dimissItem, editItem, emptyCart } from "../../features/cart/cartSlice"
import { delItem, updateTotal, emptyItems } from "../../features/total/totalSlice"
import Swal from 'sweetalert2'


function Modal(props) {
  const cartState = useSelector(state => state.cart)
  const totalState = useSelector(state => state.total.value)
  const totalItems = useSelector(state => state.total.items)

  
  let modalClass = props.display ? 'flex' : 'hidden'
  document.body.style.overflowY = props.display ? 'hidden' : 'scroll'

  const dispatch = useDispatch()

  const buy = () => {
    if(totalItems === 0){
      alert('add products')
    }else{
      if(window.confirm('finalize purchase?')){
        dispatch(updateTotal(0))
        dispatch(emptyItems())
        dispatch(emptyCart())
        alert('successful purchase');
      }
    }
  }
  const dimis = e =>{
    const {id, amount, price} = e;
    dispatch(dimissItem({id, amount}))
    if(amount !== 1) dispatch(updateTotal(totalState - price))
  }
  const add = e =>{
    const {id, amount, price} = e;
    dispatch(editItem({id, itemAmount: amount}))

    dispatch(updateTotal(totalState + price))
  }
  const HandleDelete = (e) =>{
      Swal.fire({
        title: 'Delete item?',
        text: e.title ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#115e59',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continue',
        background: '#27272a',
        color: '#FFF',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteItem(e.id))
          dispatch(updateTotal(totalState - (e.amount * e.price)))
          dispatch(delItem()) 
        }
      })
  }
  return (
    <div className={`absolute top-16 flex justify-center left-0 bottom-0 right-0 bg-[#181818c4] ${modalClass}`}>
      <div className='rounded-md overflow-y-auto bottom-4 w-5/12 my-5 bg-zinc-800 realative'>
      <div className=" w-5/12 fixed bg-zinc-800 flex justify-between px-10 items-center text-xl text-teal-600 py-5">
        <div>
         <span>total: </span>
          <span>${totalState}
          </span>
        </div>
         <span className="flex justify-center items-center gap-3">
          <button onClick={buy} className="bg-teal-500 hover:bg-teal-600 text-zinc-900 font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded">
            Buy
          </button>
         </span>
      </div>
      <div className="pt-24 pb-10 flex flex-col items-center px-5">
      {
      cartState.length !== 0 ? 
      cartState.map((e, index) =>(
        <div key={index} className="w-full text-md text-teal-600 grid grid-cols-5 justify-center text-center items-center gap-3 py-3 ">
          <span className="">{e.amount}</span>
          <span title={e.title} className="cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden">{e.title}</span>
          <span>
            <span>$</span>
            <span>{e.price}</span>          
          </span>
          <span >
            <span>$</span>
            <span title="subTotal">{e.price * e.amount}</span>
          </span>
          <span className="flex justify-between items-center">
            <button onClick={()=>{add(e)}} className="hover:bg-teal-600 hover:text-zinc-800 rounded-md flex justify-center items-center w-15 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button onClick={() => {dimis(e)}} className="hover:bg-teal-600 hover:text-zinc-800 rounded-md flex justify-center items-center w-15 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
            <button onClick={() => {HandleDelete(e)}} className="hover:bg-teal-600 hover:text-zinc-800 rounded-md flex justify-center items-center w-15 m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </span>
        </div>
      )) :
      <div className="grid font-semibold text-xl text-gray-500 w-full pt-10 place-content-center">
        Cart Empty
      </div>
      }
      </div>
      </div>
    </div>
  )
}

export default Modal

