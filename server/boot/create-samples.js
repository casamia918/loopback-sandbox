module.exports = function(app) {
  var db = app.datasources.db;

  var createUsers = function(cb) {
    var user = app.models.user;
    user.destroyAll();
    user.create([{
      email : "user1@test.com",
      password : "asdfasdf"
    }, 
    {
      email : "user2@test.com",
      password : "asdfasdf"
    }], cb);

  }

  var createContacts = function(cb) {
    var contact = app.models.contact;
    contact.destroyAll();
    contact.create([
        {name: 'contact1 of user1', friendId: 11, is_mutual: false, ownerId: 1},
        {name: 'contact2 of user1', friendId: 21, is_mutual: false, ownerId: 1},
        {name: 'contact3 of user2', friendId: 31, is_mutual: false, ownerId: 2},
        {name: 'contact4 of user2', friendId: 41, is_mutual: false, ownerId: 2}

    ], cb);
  }

  createUsers(function(err, userInst) {
    if(err) console.log(err);
    console.log(userInst);
    createContacts(function(err, contactInst) {
      if(err) console.log(err);
      console.log(contactInst);
    })
  });
}
