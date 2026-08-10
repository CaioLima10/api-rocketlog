import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"
import { afterEach } from "node:test"


describe("UsersController", () => {

  let user_id: string

  afterAll( async () => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "João da Silva",
      email: "joao.silva@example.com",
      password: "12345678"  
      
    })
    user_id = response.body.userWithoutPassword.id

    expect(response.status).toBe(201)
    expect(response.body.userWithoutPassword).toHaveProperty("id")
    expect(response.body.userWithoutPassword.name).toBe("João da Silva")
  })

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app).post("/users").send({
    name: "João da Silva",
    email: "joao.silva@example.com",
    password: "12345678"
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User with same email already exists")
  })

})