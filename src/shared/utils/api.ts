// import { BaseUrlConfig, LocalStorageConfig } from '@/shared/config/defaultConfig'
// import { DataResponse, HttpResponse } from '@models/api-response-models'
import { BaseUrlConfig, LocalStorageConfig } from '../configs/defaultConfig'
import { getSessionStorage, removeAllSessionStorage } from './storage'
import { DataResponse, HttpResponse } from '@/models/api-response.models'

const API_URL: string = process.env.NEXT_PUBLIC_BASE_URL_API as ''

const HandleError = (code: number, path?: string) => {
  console.log(path)

  if (code === 401) {
    if (typeof window !== 'undefined') {
      const BaseUrl = window.location.origin
      removeAllSessionStorage()

      window.location.replace(`${BaseUrl + BaseUrlConfig.login}`)
    }
  }
}

const getTokenSession = async () => {
  const res: string | null = getSessionStorage(LocalStorageConfig.token)

  if (res) {
    return res
  }

  return ''
}

export const getDataWithToken = async <T extends DataResponse>(url: string): Promise<HttpResponse<T> | any> => {
  const tokenSession = await getTokenSession()
  // eslint-disable-next-line react-hooks/rules-of-hooks

  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenSession}`
      },
      cache: 'no-store',
    })
    const resJson: HttpResponse<T> = await res.json()

    // if (resJson?.details?.status_code !== 200) {
    //   HandleError(resJson.details.status_code, resJson.details.path)
    // }

    return resJson
  } catch (error) {
    return error
  }
}

export const postDataWithToken = async <T extends DataResponse>(url: string, body: any): Promise<HttpResponse<T>> => {
  const tokenSession = await getTokenSession()

  console.log(JSON.stringify(body), body, 'CHeck')

  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenSession}`
    },
    body: JSON.stringify(body)
  })
  const resJson: HttpResponse<T> = await res.json()

  if (resJson.details.status_code !== 200) {
    HandleError(resJson.details.status_code)
  }

  return resJson
}

export const putDataWithToken = async <T extends DataResponse>(url: string, body: any): Promise<HttpResponse<T>> => {
  const tokenSession = await getTokenSession()

  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenSession}`
    },
    body: JSON.stringify(body)
  })
  const resJson: HttpResponse<T> = await res.json()

  if (resJson.details.status_code !== 200) {
    HandleError(resJson.details.status_code)
  }

  return resJson
}

export const patchDataWithToken = async <T extends DataResponse>(url: string, body: any): Promise<HttpResponse<T>> => {
  const tokenSession = await getTokenSession()
  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenSession}`
    },
    body: JSON.stringify(body)
  })
  const resJson: HttpResponse<T> = await res.json()

  if (resJson.details.status_code !== 200) {
    HandleError(resJson.details.status_code)
  }

  return resJson
}

export const deleteDataWithToken = async <T extends DataResponse>(
  url: string,
  body?: any
): Promise<HttpResponse<T>> => {
  const tokenSession = await getTokenSession()

  const init: RequestInit = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenSession}`
    }
  }
  if (body) {
    Object.assign(init, {
      body: JSON.stringify(body)
    } as RequestInit)
  }
  const res: Response = await fetch(`${API_URL}${url}`, init)
  const resJson: HttpResponse<T> = await res.json()

  if (resJson.details.status_code !== 200) {
    HandleError(resJson.details.status_code)
  }

  return resJson
}

export const getData = async <T extends DataResponse>(url: string, next?: NextFetchRequestConfig): Promise<HttpResponse<T> | any> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      cache: 'no-store',
      next: next
    })
    const resJson: HttpResponse<T> = await res.json()

    return resJson
  } catch (error) {
    return error
  }
}

export const postData = async <T extends DataResponse>(url: string, body: any): Promise<HttpResponse<T> | any> => {
  try {
    const res: Response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify(body)
    })

    const resJson: HttpResponse<T> = await res.json()

    return resJson
  } catch (error) {
    return error
  }
}

export const putData = async <T extends DataResponse>(url: string, body: any): Promise<HttpResponse<T>> => {
  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const resJson: HttpResponse<T> = await res.json()

  return resJson
}

export const deleteData = async <T extends DataResponse>(url: string, body?: any): Promise<HttpResponse<T>> => {
  const init: RequestInit = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (body) {
    Object.assign(init, {
      body: JSON.stringify(body)
    } as RequestInit)
  }
  const res: Response = await fetch(`${API_URL}${url}`, init)

  const resJson: HttpResponse<T> = await res.json()

  return resJson
}

export const postDataTokenFormData = async <T extends DataResponse>(
  url: string,
  body: any
): Promise<HttpResponse<T>> => {
  const tokenSession = await getTokenSession()

  const form_data = new FormData()

  console.log(body)

  for (const key in body) {
    if (typeof body[key] === 'object') {
      if (body[key] instanceof File) {
        if (body[key].name !== "") {

          form_data.append(key, body[key])
        }
      } else {
        if (body[key] !== null) {
          for (let i = 0; i < body[key].length; i++) {
            form_data.append(key, body[key][i])
            console.log(body[key][i])
          }
        } else {
          form_data.append(key, body[key])
        }
      }
    } else {
      form_data.append(key, body[key])
    }
  }

  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenSession}`
    },
    body: form_data
  })
  const resJson: HttpResponse<T> = await res.json()

  return resJson
}

export const putDataTokenFormData = async <T extends DataResponse>(
  url: string,
  body: any
): Promise<HttpResponse<T>> => {
  const tokenSession = await getTokenSession()

  const form_data = new FormData()

  console.log(body)

  for (const key in body) {
    if (typeof body[key] === 'object') {
      if (body[key] instanceof File) {
        if (body[key].name !== "") {

          form_data.append(key, body[key])
        }
      } else {
        for (let i = 0; i < body[key].length; i++) {
          form_data.append(key, body[key][i])
          console.log(body[key][i])
        }
      }
    } else {
      form_data.append(key, body[key])
    }
  }

  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${tokenSession}`
    },
    body: form_data
  })
  const resJson: HttpResponse<T> = await res.json()

  return resJson
}

export const postDataFormData = async <T extends DataResponse>(url: string, body: any): Promise<HttpResponse<T>> => {

  const form_data = new FormData()

  console.log(body)

  for (const key in body) {
    if (typeof body[key] === 'object') {
      if (body[key] instanceof File) {
        if (body[key].name !== "") {

          form_data.append(key, body[key])
        }
      } else {
        for (let i = 0; i < body[key].length; i++) {
          form_data.append(key, body[key][i])
          console.log(body[key][i])
        }
      }
    } else {
      form_data.append(key, body[key])
    }
  }

  const res: Response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: form_data
  })
  const resJson: HttpResponse<T> = await res.json()

  return resJson
}
