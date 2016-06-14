var request = require("request");

var baseUrl = "http://localhost:3000";

describe("AccountsController", function() {
  var url = function(endpoint) {
    return baseUrl + "/accounts" + endpoint;
  };

  describe("#index", function() {
    it("returns a Success response", function(done) {
      request.get(url("/"), function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
