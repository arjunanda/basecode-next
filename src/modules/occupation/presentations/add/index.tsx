"use client";

import ButtonComponent from "@/shared/components/button";
import InputComponent from "@/shared/components/input";
import SelectComponent from "@/shared/components/select";
import React, { FormEvent, useState } from "react";
import { AddOccupationCase } from "../../usecases/occupation.usecase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const data = [
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
    value: 1,
  },
  {
    text: "InActive",
    value: 0,
  },
];

const FormAddOccupation = () => {
    const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const toastId = toast.loading('Adding Data...')
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const fullname: string = formData.get("fullname") as string;
    const phone_number: string = formData.get("phone") as string;
    const id_card: File = formData.get("id_card") as File;
    const marriage: number = parseInt(formData.get("marriage") as string);
    const status: number = parseInt(formData.get("status") as string);

    const add = await AddOccupationCase({
        fullname,
        phone_number,
        id_card,
        marriage,
        status: Boolean(status)
    })

    setIsLoading(false)

    if (add.valid) {

        toast.success(add.message, {
            id: toastId
        })

        router.push('/dashboard/occupation')
    } else {
        toast.error(add.message, {
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
      name="add"
    >
      <div>
        <label className="text-slate-300 text-sm">Full Name</label>
        <InputComponent placeholder="Full Name" name="fullname" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Phone Number</label>
        <InputComponent placeholder="Phone Number" name="phone" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">ID Card</label>
        <InputComponent placeholder="ID Card" name="id_card" type="file" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Marriage</label>
        <SelectComponent data={data} name="marriage" />
      </div>
      <div>
        <label className="text-slate-300 text-sm">Status</label>
        <SelectComponent data={status} name="status" />
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

export default FormAddOccupation;
