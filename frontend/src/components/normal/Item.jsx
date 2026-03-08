import React from 'react'

const Item = ({children}) => {
  return (
    <div className="h-[16%] flex items-center justify-between border border-slate-700 rounded-lg p-4 mb-4">    
        {children}
    </div>
  )
}

export default Item
