import { describe, afterEach, it, expect, jest } from "@jest/globals"
import { makeGetRequest } from "./one"
import axios from "axios"

describe("makeGetRequest", () => {
  let mockJest: any

  // beforeEach(() => {
  // mockJest = jest.spyOn(axios, "get").mockResolvedValueOnce({ status: 200, data: {} })
  // })

  // afterEach(() => {
  //   mockJest.mockRestore()
  // })

  it("should make a GET 200 request to the specified URL", async () => {
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin"
    const headers = { "Content-Type": "application/json" }

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

    // mockJest = jest.spyOn(axios, "get").mockResolvedValueOnce(expectedResponse)

    const result = await makeGetRequest(axios, url, headers)()

    expect(result.status).toEqual(200)
    // expect(mockJest).toHaveBeenCalledWith(url)
  })

  it("should handle a GET 404 request error to a specified URL", async () => {
    const url = "https://api.coingecko.com/api/v3/coins/missing_coin_asfdasfd"
    const headers = { "Content-Type": "application/json" }

    const expectedResponse = {
      data: {
        error: "coin not found",
      },
      status: 404,
    }

    // mockJest = jest.spyOn(axios, "get").mockRejectedValueOnce(Error("Boom!"))

    const result = await makeGetRequest(axios, url, headers)()
  })

  it("should handle a GET 500 No response request error to a specified URL", async () => {
    const url = "https://api.coingeckoX0X0X0X0.com/api/v3/coins/missing_coin_asfdasfd"
    const headers = { "Content-Type": "application/json" }

    const expectedResponse = {
      data: {
        error: "No response",
      },
      status: 500,
    }

    // mockJest = jest.spyOn(axios, "get").mockRejectedValueOnce(Error("Boom!"))

    const result = await makeGetRequest(axios, url, headers)()
    // console.log(result.status, result.data)
    expect(result).toEqual(expectedResponse)
  })

  it("should handle a GET 500 Unknown error request error to a specified URL", async () => {
    const url = "https://api.coingeckoX0X0X0X0.com/api/v3/coins/missing_coin_asfdasfd"
    const headers = { "Content-Type": "application/json" }

    const expectedResponse = {
      data: {
        error: "Unknown error",
      },
      status: 500,
    }

    mockJest = jest.spyOn(axios, "get").mockRejectedValueOnce(Error("Unkown error"))

    const result = await makeGetRequest(axios, url, headers)()
    // console.log(result.status, result.data)
    expect(result).toEqual(expectedResponse)
  })
})
