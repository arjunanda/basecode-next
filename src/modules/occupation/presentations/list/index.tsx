"use client";

import ButtonComponent from "@/shared/components/button";
import React, { useEffect, useState } from "react";
import { OccupationRes } from "../../models/occupation-response";
import { paginate } from "@/models/api-response.models";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DeleteOccupationByIdCase, GetOccupationCase } from "../../usecases/occupation.usecase";
import toast from "react-hot-toast";

type Props = {
  data?: paginate<Array<OccupationRes>>;
};

const TableOccupation = (props: Props) => {
  const [data, setData] = useState<paginate<Array<OccupationRes>> | undefined>(
    props.data
  );

  const router = useRouter()
  const path = usePathname()

  const handlePage = async (id: number) => {
    const getData = await GetOccupationCase("?page=" + id);

    if (getData.valid) {
      setData(getData.data);
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading('Deleted Data....')
    const remove = await DeleteOccupationByIdCase(id.toString())

    if (remove.valid) {

      toast.success(remove.message, {
          id: toastId
      })
  } else {
      toast.error(remove.message, {
          id: toastId
      })
      
  }
  }

  return (
    <div>
      <div className="flex justify-between  pb-6 pt-3">
        <h1 className="uppercase font-semibold text-white text-2xl">
          Occupation
        </h1>
        <ButtonComponent value={"Add"} className="px-7" onClick={() => {
          router.push(path + '/add')
        }} />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded bg-gray-600 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
          <thead className="text-md text-gray-200 uppercase bg-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Full name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data ? (
              data.data.map((v, key) => (
                <tr
                  className=" border-b border-slate-500 bg-gray-800 "
                  key={key}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {key + (data.from ?? 1)}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap "
                  >
                    {v.fullname}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">
                    Silver
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">
                    Laptop
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-300">$2999</td>
                  <td className="px-6 py-4 font-medium text-gray-300 flex ">
                    {/* <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a> */}
                    <div className="mr-2">
                      <ButtonComponent
                        value={"Edit"}
                        onClick={() => {
                          router.push(path + '/update/' + v.id)
                        }}
                        className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 rounded"
                        type="button"
                      />
                    </div>
                    <div>
                      <ButtonComponent
                        value={"Delete"}
                        onClick={()=> {
                          const confirm = window.confirm('Are you sure you want to delete the data?')
                          if (confirm) {
                            handleDelete(v.id)
                          }
                        }}
                        className="px-4 py-1.5 bg-red-700 hover:bg-red-800 rounded"
                        type="button"
                      />
                    </div>
                    {/* <button className="bg-sky-700 hover:bg-sky-800 py-1.5 px-4 rounded uppercase font-semibold tracking-widest">
                      Edit
                  </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr className=" border-b border-slate-500 bg-gray-800">
                <td
                  scope="row"
                  className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  colSpan={100}
                >
                  Data Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between py-4 px-2"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal  mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold  text-white">
              {data?.from ?? 0}-{data?.to ?? 10}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.total ?? 0}
            </span>
          </span>
          {data?.last_page && data?.last_page > 1 && (
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={() => {
                    handlePage(data?.first_page ?? 1);
                  }}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Previous
                </button>
              </li>
              {[...Array(data?.last_page)].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      handlePage(index + 1);
                    }}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      data?.current_page === index + 1
                        ? `bg-gray-700`
                        : `bg-gray-800`
                    }  border  hover:bg-gray-600  border-gray-700 text-gray-200  hover:text-white`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handlePage(data?.last_page ?? 1);
                  }}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default TableOccupation;
