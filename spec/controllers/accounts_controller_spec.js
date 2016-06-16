var request = require("request")

var baseUrl = "http://localhost:3000"

describe("AccountsController", function() {
  var url = function(endpoint) {
    return baseUrl + "/accounts" + endpoint
  }

  describe("#index", function() {
    it("returns a Success response", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it("should be json", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.headers['content-type']).toContain('application/json')
        done()
      })
    })

    it("should be an array of objects", function(done) {
      request.get(url("/"), function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual(['id'])
        }
        
        done()
      })
    })
  })
})






