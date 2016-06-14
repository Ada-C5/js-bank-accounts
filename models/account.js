var app = require("../app");
var db = app.get("db");

// Constructor function
var Account = function(id) {
  this.id = id;
};

// Instance functions
Account.prototype.getBalance = function(callback) {
  db.accounts.findOne(this.id, function(error, result) {
    if(error) {
      callback(error, undefined);
    } else {
      callback(null, result.balance);
    }
  });

  return this;
};

var balanceResultCallback = function(account, callback) {
  return function(error, result) {
    if(error) {
      callback(error, undefined);
    } else {
      account.getBalance(function(error, balance) {
        callback(error, balance);
      });
    }
  };
};

Account.prototype.deposit = function(amount, callback) {
  db.accounts_deposit(this.id, amount, balanceResultCallback(this, callback));
  return this;
};

Account.prototype.withdraw = function(amount, callback) {
  db.accounts_withdraw(this.id, amount, balanceResultCallback(this, callback));
  return this;
};

Account.prototype.transfer = function(to, amount, callback) {
  db.accounts_transfer(this.id, to.id, amount, balanceResultCallback(this, callback));
  return this;
};

// Class Functions
Account.create = function(initialBalance, callback) {
  db.accounts.save({
    balance: initialBalance
  }, function(error, account) {
    if(error || !account) {
      callback(error || new Error("Could not create account"), undefined);
    } else {
      callback(null, new Account(account.id));
    }
  });
};

Account.createSync = function(initialBalance) {
  var account = db.accounts.saveSync({
    balance: initialBalance
  });

  return new Account(account.id);
};

Account.all = function(callback) {
  db.accounts.find(function(error, accounts) {
    if(error || !accounts) {
      callback(error || new Error("Could not retrieve accounts"), undefined);
    } else {
      callback(null, accounts.map(function(account) {
        return new Account(account.id);
      }));
    }
  });
};

Account.find = function(id, callback) {
  db.accounts.findOne({id: id}, function(error, account) {
    if(error || !account) {
      callback(error || new Error("Account not found"), undefined);
    } else {
      callback(null, new Account(account.id));
    }
  });
};

module.exports = Account;
