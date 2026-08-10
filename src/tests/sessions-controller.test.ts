import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("SessionsController",() => {
  let user_id: string

  afterAll( async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("should authenticate a and get access token", async() => {
    const userResponse = await request(app).post("/users").send({
      name: "João da silva 2",
      email: "joao2.silva@example.com",
      password: "12345678"
    })

    user_id = userResponse.body.userWithoutPassword.id

    const sessionResponse = await request(app).post("/sessions").send({
      email: "joao2.silva@example.com",
      password: "12345678"
    })

    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body.token).toEqual(expect.any(String))

  })
})