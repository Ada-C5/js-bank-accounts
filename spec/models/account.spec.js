var app = require("../../app");
var db = app.get("db");

var Account = require('../../models/account')

describe('Account', function () {
  var account1, account2
  var initialBalance1 = 100.0
  var initialBalance2 = 0

  beforeEach(function (done) {
    Account.create(initialBalance1, function(err, account) {
      account1 = account
      done()
    })
  })

  afterEach(function () {
    // delete all the accounts I created
    
    db.end()
    // Account.close_connection()
  })

  describe('#getBalance', function () {
    it('should return positive balances', function (done) {
      account1.getBalance(function (error, balance) {
        expect(error).toBeNull
        expect(balance).toEqual('$100.00')
        done()
      })
    })

    it('should not break, I guess', function (done) {
      account1.getBalance(function (error, balance) {
        expect(error).toBeNull
        expect(balance).toEqual('$100.00')
        done()
      })
    })
  })
})

