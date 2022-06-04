const app = require("../server.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//get user data
test("getUserDetails", async () => {
  const user = await supertest(server).get("/login").send({});
  expect(user.statusCode).toBe(200);
});
