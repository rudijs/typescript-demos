import { describe, afterEach, it, expect, jest } from "@jest/globals"
import { makeGetRequest } from "./one"
import axios from "axios"

describe("makeGetRequest", () => {
  let mockJest: any

  // beforeEach(() => {
  // mockJest = jest.spyOn(axios, "get").mockResolvedValueOnce({ status: 200, data: {} })
  // })

  afterEach(() => {
    mockJest.mockRestore()
  })

  it("should make a GET request to the specified URL", async () => {
    const url = "https://dummyjson.com/products/1"

    const expectedResponse = {
      data: {
        key: "value",
      },
      status: 200,
      statusText: "OK",
      headers: {},
    }

    mockJest = jest.spyOn(axios, "get").mockResolvedValueOnce(expectedResponse)

    const result = await makeGetRequest(axios, url)()
    // console.log(JSON.stringify(result, null, 2))

    expect(result).toEqual(expectedResponse)
    expect(mockJest).toHaveBeenCalledWith(url)
  })
})
