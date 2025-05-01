import React from 'react'
import { loop } from '../../assets'

export const SearchInput = () => {
  return (
    <>
   
    <div>
      <img className = "absolute w-6 h-6 mt-[1px]"src={loop} alt="" />
      <input
      
        type="text"
        className="w-70 h-full  focus:outline-none   font-poppins-regular text-sm   border-b-1 bg-gray-100 rounded-sm pl-7"
        placeholder="Search... "
       
      />

      </div>


      
      </>

    
  )
}

export default SearchInput
