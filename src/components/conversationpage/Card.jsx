import React from 'react'

const Card = ({className ='', children}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>
        {children}
    </div>
  )
}

export default Card