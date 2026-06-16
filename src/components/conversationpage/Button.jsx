import React from 'react'

const Button = ({label}) => {
  return (
    <div>
        <button className='bg-[#4866F6] flex items-center justify-center gap-[10px] opacity-100 w-[222px] h-[44px] rounded-[25px] px-[25px] py-[14.5px] text-white'>{label}</button>
    </div>
  )
}

export default Button