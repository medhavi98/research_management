const app = require("../server.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const userR = require("../routes/UserRoute");
const mock = jest.fn();

const userD = {
  fullName: "Bhasura S.R.M.P",
  department: "",
  phone: "0766495334",
  sliitEmail: "it19951386@my.sliit.lk",
  personalEmail: "it19951386@my.sliit.lk",
  studentId: "IT19951386",
};

//get user data when login is successful
test("getUserDetails", async () => {
  const user = await supertest(app).get("/userDetails").send({});
  expect(user.statusCode).toBe(200);
  expect(mock).toBe(userD);
});

test("getOneUserDetails", async () => {
  const getOne = await supertest(userR)
    .get("/getOneUserDetails")
    .expect(getOne.statusCode)
    .toBe(200);
});
