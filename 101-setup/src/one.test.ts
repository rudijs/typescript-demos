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
      // `data` is the response that was provided by the server
      data: {
        key: "value",
      },

      // `status` is the HTTP status code from the server response
      status: 200,

      // `statusText` is the HTTP status message from the server response
      // As of HTTP/2 status text is blank or unsupported.
      // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
      statusText: "OK",

      // `headers` the HTTP headers that the server responded with
      // All header names are lower cased and can be accessed using the bracket notation.
      // Example: `response.headers['content-type']`
      headers: {},

      // `config` is the config that was provided to `axios` for the request
      config: {},

      // `request` is the request that generated this response
      // It is the last ClientRequest instance in node.js (in redirects)
      // and an XMLHttpRequest instance in the browser
      request: {},
    }

    mockJest = jest.spyOn(axios, "get").mockResolvedValueOnce(expectedResponse)

    const result = await makeGetRequest(axios, url)()
    console.log(JSON.stringify(result, null, 2))

    expect(result).toEqual(expectedResponse)
    expect(mockJest).toHaveBeenCalledWith(url)
  })

  it("should handle a GET request error to a specified URL", async () => {
    const url = "https://dummyjson.com/products/1"

    const expectedResponse = {
      data: {
        key: "value",
      },
      status: 200,
      statusText: "OK",
      headers: {},
    }

    mockJest = jest.spyOn(axios, "get").mockRejectedValueOnce(Error("Boom!"))

    const result = await makeGetRequest(axios, url)()
    console.log(JSON.stringify(result, null, 2))
  })
})
