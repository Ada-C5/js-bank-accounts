var spawn = require('child_process').spawnSync;
var Massive = require('massive');

['development', 'test'].forEach(function(env) {
  var dbName = `bank-accounts_${env}`;

  // Create the DB if it doesn't already exist
  var createDB = spawn('createdb', [dbName]);
  if(createDB.error) {
    console.log("Error creating database " + dbName + ":");
    console.log(createDB);
    return;
  } else {
    console.log("Successfully created database " + dbName + ".");
  }

  // Setup the DB schema
  var db = Massive.connectSync({ db: dbName });
  db.create_schema(function(error, result) {
    if(error) {
      console.log("Error creating DB schema for " + dbName + ":");
      console.log(error);
    } else {
      console.log("Successfully created DB schema for " + dbName + ".");
    }
  });
});
