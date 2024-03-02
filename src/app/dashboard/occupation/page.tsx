import { TableOccupation } from "@/modules/occupation/presentations";
import { GetOccupationCase } from "@/modules/occupation/usecases/occupation.usecase";
import ButtonComponent from "@/shared/components/button";
import React from "react";


const Occupation = async () => {

  const getData = await GetOccupationCase()

  return (
    <div>
      
      <div className=" text-white">
        <TableOccupation data={getData.data} />
      </div>
    </div>
  );
};

export default Occupation;
