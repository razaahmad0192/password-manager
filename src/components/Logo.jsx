import React from 'react'

function Logo({
  color="text-white",
  size= "text-xl"
}) {
  return (
    <div>
      <h1 className={`text-green-400 font-bold ${size} cursor-pointer`}>{"<"}<span className={color}>Pass</span>OP{"/>"}</h1>
    </div>
  )
}

export default Logo
