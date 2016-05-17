# loopback-sandbox

A repository for reproducing [LoopBack community issues][wiki-issues].

[wiki-issues]: https://github.com/strongloop/loopback/wiki/Reporting-issues

## Bug report
### 1 Protected property is not working
**Model definition(bold)**
- user: opened with public api, has many contact
- contact : private model, can only access by users. Have 3 properties and 2 of them are protected property
**Bug occur(bold)**
When API request with  GET /users/{id}/contacts, all the contact properties are responsed. The 'friendId' and 'is_mutual' properties are defiend with protected. But it does not working




