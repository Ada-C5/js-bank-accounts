var Account = require("../models/account");

var AccountsController = {
  index: function(req, res, next) {
    Account.all(function(error, accounts) {
      if(error) {
        var err = new Error("Error retrieving account list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(accounts)
        // res.render("accounts/index", {
        //   accounts: accounts
        // });
      }
    });
  },

  show: function(req, res, next) {
    Account.find(req.params.id, function(error, account) {
      if(error) {
        var err = new Error("No such account");
        err.status = 404;
        next(err);
      } else {
        account.getBalance(function(error, balance) {
          res.render("accounts/show", {
            account: {
              id: account.id,
              balance: balance
            }
          });
        });
      }
    });
  }
};

module.exports = AccountsController;
