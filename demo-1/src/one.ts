import { AxiosStatic } from "axios"

export function makeGetRequest(axiosInstance: AxiosStatic, url: string) {
  return async () => {
    try {
      return await axiosInstance.get(url)
    } catch (error) {
      return `Error making GET request: ${error}`
    }
  }
}
