import React from 'react'

const Item = ({children}) => {
  return (
    <div className="group flex items-center justify-between p-5 mb-4 rounded-2xl 
      bg-white/[0.02] hover:bg-white/[0.04] 
      border border-white/[0.05] hover:border-white/[0.1]
      backdrop-blur-xl
      transition-all duration-300 ease-in-out
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      cursor-pointer">    
        {children}
    </div>
  )
}

export default Item
