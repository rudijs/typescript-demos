import { AxiosStatic, AxiosError } from "axios"

interface Response {
  status: number
  data: any
}

export function makeGetRequest(axiosInstance: AxiosStatic, url: string, headers: any = {}) {
  return async (): Promise<Response> => {
    try {
      const request = await axiosInstance.get(url, { headers })
      console.log(JSON.stringify(request.data, null, 2))
      return { status: request.status, data: request.data }
    } catch (error) {
      if (axiosInstance.isAxiosError(error)) {
        // console.log(error.toJSON())

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.code)
          // console.log(error.response.status)
          // console.log(error.response.data)
          // console.log(error.response.headers)
          return { status: error.response.status, data: error.response.data }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request)
          return { status: 500, data: { error: "No response" } }
        }
      }
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error)
      return { status: 500, data: { error: "Unknown error" } }
    }
  }
}
