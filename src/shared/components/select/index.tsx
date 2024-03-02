import React, { FormEvent, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>  {
    data: Array<{
        value: string | number,
        text: string
    }>
}

const SelectComponent = ({data, ...props}: SelectProps) => {

    
  return (
    <div>
        <select className='rounded-lg shadow w-full bg-white focus:outline-none text-gray-600 px-3 border border-gray-300 py-2' {...props}>
            {data && data.map((v,key) => {
                return (
                    <option value={v.value} key={key}>{v.text}</option>
                )
            })}
        </select>
    </div>
  )
}

export default SelectComponent