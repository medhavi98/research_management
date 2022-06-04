const app = require("../server.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//get user data when login is successful
test("getUserDetails", async () => {
  const user = await supertest(app).get("/userDetails").send({});
  expect(user.statusCode).toBe(200);
});

//
