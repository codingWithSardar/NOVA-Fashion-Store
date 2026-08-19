import React from "react";

const Title = ({ text1, text2 }) => {
  return (

    <div className="flex flex-col gap-3 items-center text-center">
      <h1 className="text-3xl sm:text-4xl primary tracking-wide text-black">
        {text1}{" "}
        <span className="font-semibold secondary">{text2}</span>
      </h1>

      <div className="flex items-center gap-2">
        <span className="w-8 h-[1.5px] bg-black/30"/>
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"/>
        <span className="w-8 h-[1.5px] bg-black/30"/>
      </div>
    </div>
  )
}

export default Title;