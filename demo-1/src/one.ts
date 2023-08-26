import { AxiosStatic, AxiosError } from "axios"

export function makeGetRequest(axiosInstance: AxiosStatic, url: string) {
  return async () => {
    try {
      return await axiosInstance.get(url)
    } catch (error) {
      if (axiosInstance.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message)
        }
        // Do something with this error...
        console.log(error.toJSON())
      } else {
        // console.error(error)
        return `Error 201 making GET request: ${error}`
      }
    }
  }
}
