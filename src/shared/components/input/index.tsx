import React, { InputHTMLAttributes } from 'react'


const InputComponent = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
        <input value={props.value} onChange={props.onChange} className='rounded-lg shadow w-full bg-white focus:outline-none text-gray-500 px-3 border border-gray-300 py-2' {...props} />
    </div>
  )
}

export default InputComponent