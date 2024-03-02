import { OccupationRes } from '@/modules/occupation/models/occupation-response'
import { FormUpdateOccupation } from '@/modules/occupation/presentations'
import { GetOccupationByIdCase } from '@/modules/occupation/usecases/occupation.usecase'
import React from 'react'


const UpdateOccupation = async ({ params }: { params: { id: string } }) => {

  const getData = await GetOccupationByIdCase(params.id)

  console.log(getData)
  return (
    <div>
        <h1 className="uppercase font-bold text-white text-2xl">
          Add Occupation
        </h1>
        <div className='rounded-md shadow-md bg-slate-600 w-full min-h-52 mt-5'>
          <FormUpdateOccupation id={params.id} data={getData.data as OccupationRes}/>
        </div>
    </div>
  )
}

export default UpdateOccupation