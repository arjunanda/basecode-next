"use client";

import ButtonComponent from "@/shared/components/button";
import InputComponent from "@/shared/components/input";
import SelectComponent from "@/shared/components/select";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { OccupationRes } from "../../models/occupation-response";
import { UpdateOccupationByIdCase } from "../../usecases/occupation.usecase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const dataMariage = [
  {
    text: "Select Marriage",
    value: "",
  },
  {
    text: "Test 1",
    value: 1,
  },
  {
    text: "Test 2",
    value: 2,
  },
];

const status = [
  {
    text: "Active",
    value: "1",
  },
  {
    text: "InActive",
    value: "0",
  },
];

type Props = {
    id: string,
    data?: OccupationRes,
}

const FormUpdateOccupation = ({id, data}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter()


  const STORAGE_URL: string = process.env.NEXT_PUBLIC_BASE_URL_STORAGE as "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const fullname: string = formData.get("fullname") as string;
    const phone_number: string = formData.get("phone") as string;
    const id_card: File = formData.get("id_card") as File;
    const marriage: number = parseInt(formData.get("marriage") as string);
    const status: number = parseInt(formData.get("status") as string);


    const toastId = toast.loading('Update Data...')

    const update = await UpdateOccupationByIdCase({
        fullname,
        phone_number,
        id_card,
        marriage,
        status: Boolean(status)
    }, id)

    setIsLoading(false)

    if (update.valid) {

        toast.success(update.message, {
            id: toastId
        })

        // router.push('/dashboard/occupation')
    } else {
        toast.error(update.message, {
            id: toastId
        })
        
    }
  }

  return (
    <form
      className="w-full md:w-2/3 lg:w-1/2 p-5 space-y-5"
      onSubmit={onSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <div>
        <label className="text-slate-300 text-sm">Full Name</label>
        <InputComponent
          placeholder="Full Name"
          defaultValue={data?.fullname}
          name="fullname"
        />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Phone Number</label>
        <InputComponent
          placeholder="Phone Number"
          name="phone"
          defaultValue={data?.phone_number}
        />
      </div>
      <div>
        <label className="text-slate-300 text-sm">ID Card</label>
        <InputComponent
          placeholder="ID Card"
          name="id_card"
          type="file"
        />
        {data?.id_card && (

          <div className="w-20 h-[85px] relative mt-5">
            <Image
              src={STORAGE_URL + data?.id_card}
              alt="image"
              className="rounded shadow border border-gray-500 object-cover"
              priority
              quality={75}
              fill
            />
          </div>
        )}
      </div>
      <div>
        <label className="text-slate-300 text-sm">Marriage</label>
        <SelectComponent
          data={dataMariage}
          name="marriage"
          defaultValue={data?.marriage as number}
        />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Status</label>
        <SelectComponent
          data={status}
          name="status"
          defaultValue={data?.status ? 1 : 0}
        />
      </div>
      <div className="flex space-x-3 pt-4 pb-2">
        <ButtonComponent value={"Submit"} className="px-4" type="submit" isLoading={isLoading} />
        <ButtonComponent
          value={"Cancel"}
          onClick={() => {
            router.back()
          }}
          className="px-4 bg-red-500 hover:bg-red-600 shadow"
          type="button"
        />
        <ButtonComponent
          value={"Reset"}
          className="px-4 bg-gray-500 hover:bg-gray-600 shadow"
          type="reset"
        />
      </div>
    </form>
  );
};

export default FormUpdateOccupation;
