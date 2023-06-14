db.createUser({
  user: "admin",
  pwd: "1234",
  roles: [
    {
      role: "readWrite",
      db: "precious_garden_db",
    },
  ],
});
db.createCollection("test");
