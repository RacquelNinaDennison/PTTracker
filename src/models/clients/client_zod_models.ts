// this allows us to define the structure of our client data
import { z } from "zod";

export const clientZodScheme = z.object({
    id:        z.string().uuid(),
    name:      z.string().min(2, 'Name must be at least 2 chars'),
    email:     z.string().email('Invalid email'),
    goal:      z.string().optional(),
    isActive:  z.boolean().default(true),
    createdAt: z.string().datetime(),
})

export type Client = z.infer<typeof clientZodScheme>;


export const CreateClientSchema = clientZodScheme.omit({
    id: true, createdAt: true,
  })

  export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>

