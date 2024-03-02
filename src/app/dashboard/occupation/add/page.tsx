
import { FormAddOccupation } from '@/modules/occupation/presentations'
import React from 'react'

type Props = {}

const AddOccupation = (props: Props) => {
  return (
    <div>
        <h1 className="uppercase font-bold text-white text-2xl">
          Add Occupation
        </h1>
        <div className='rounded-md shadow-md bg-slate-600 w-full min-h-52 mt-5'>
          <FormAddOccupation />
        </div>
    </div>
  )
}

export default AddOccupation