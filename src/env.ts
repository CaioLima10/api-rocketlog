import z from "zod";

const envShema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string()
})

export const env = envShema.parse(process.env)