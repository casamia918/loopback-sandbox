# loopback-sandbox

A repository for reproducing [LoopBack community issues][wiki-issues].

[wiki-issues]: https://github.com/strongloop/loopback/wiki/Reporting-issues

## Bug report
### Protected property is not working
<https://github.com/strongloop/loopback/issues/2263>

**Model definition**

- user: opened with public api, has many contact
- contact : private model, can only access by users related method (Verb /users/1/contact/{fk}). Have 3 properties and 2 of them are protected property
```
[contact.json]
"properties": {
    "name": {
      "type": "string"
    },
    "friendId": {
      "type": "number"
    },
    "is_mutual": {
      "type": "boolean"
    }
  },
"protected": ["friendId", "is_mutual" ]
```

**Bug occur** 

When API request with GET /users/{id}/contacts, all the contact properties are responsed. The 'friendId' and 'is_mutual' properties are defiend with protected. But it does not working

**STR**

1. Clone the respository and install npm modules

2. Login with user1 (I created 2 users in boot script)
  ```
  POST /users/login
  {
    "email" : "user1@test.com",
    "password" : "asdfasdf"
  }
  ```

3. Set access token

4. Get contacts owned by user1@test.com
  ```
  GET /users/1/contacts
  ```

5. After step 4, the response body has
  ```
  [ {
      "name": "contact1 of user1",
      "friendId": 11,
      "is_mutual": false,
      "id": 17,
      "ownerId": 1
    },
    {
      "name": "contact2 of user1",
      "friendId": 21,
      "is_mutual": false,
      "id": 18,
      "ownerId": 1
    }]
  ```

  What I intended is "is_mutual" and "friendId" field is hided on the client side. But it responses full field.

6. *(Additional step)* When I change the 'protected' option to 'hidden', the 'friendId' and 'is_mutual' fields are hided in the response boy, looks like no problem. But when I update the contact, with below api request
  ```
  PUT /users/1/contacts/1
  {
      "name": "contact1 of user1",
      "friendId": 20,
      "is_mutual": true,
      "ownerId": 1
  }
  ```
  The 'is_mutual' and 'friendId' fields are updated. Which means, if someone hacks and find the hidden fields name,  he can update the hidden fields and find the hidden fields name, 
  Surely, I can add the beforehook of update methods. But write that hook to the every related model is tedious work.
