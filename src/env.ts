import z from "zod";

const envShema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3456)
})

export const env = envShema.parse(process.env)