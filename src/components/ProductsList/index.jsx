import { useSelector, useDispatch } from "react-redux"
import { addItem, editItem } from '../../features/cart/cartSlice'
import {upItem, updateTotal } from '../../features/total/totalSlice';

function Index(props) {
  const cartState =  useSelector(state => state.cart)
  const totalState = useSelector(state => state.total.value)

  
  const dispatch = useDispatch()

  const catchValue = (item) => {
    const {id, title, price} = item
    if(cartState.find(ele => ele.id === id)){
      const itemAmount = cartState.filter(n => n.id === id)[0].amount
      dispatch(editItem({id, itemAmount}))
      dispatch(updateTotal(totalState + price))
    }else{
      dispatch(addItem({id, title, price}))
      dispatch(updateTotal(totalState + price))
      dispatch(upItem())
    }
  }

  return (
    <ul className="grid grid-cols-5 px-20 py-5 gap-5 z-0 ">
        {
          props.list.map((item, index)=>(
            <li key={index} className="relative group shadow-2xl p-3 flex flex-col justify-center bg-zinc-900 rounded-lg ease-out transition duration-150 hover:rotate-2 hover:scale-105  hover:cursor-pointer hover:ease-in hover:bg-zinc-800">
              <span className='text-teal-700 font-semibold text-xl text-ellipsis whitespace-nowrap overflow-hidden'>{item.title}</span>
              <img alt='product' className='w-60 h-44 group-hover:hidden rounded' src={item.images[0]} />
              <span className='absolute bg-zinc-900 px-2 rounded-r-md bottom-11 group-hover:hidden text-teal-700 font-bold text-2xl'>${item.price}</span>
              <div className='py-2 transition duration-150 group-hover:hidden flex justify-between text-zinc-600 font-medium'>
                  <small>ID {item.id}</small>
                  <small>{item.category.name}</small>
              </div>
              <div className='hidden group-hover:flex  flex-col justify-between items-center gap-3 py-3 h-full'>
                <span className="text-white">{item.description}</span>
                <button onClick={()=>catchValue(item)} className="bg-teal-800 hover:bg-teal-900 text-zinc-200 font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-900 rounded">Add Cart</button>
              </div>
            </li>
          ))
        }
    </ul>
  )
}

export default Index