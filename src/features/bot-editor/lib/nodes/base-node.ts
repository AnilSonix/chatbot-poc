import { z } from 'zod'

export const BaseNodeSchema = z.object({
    id: z.string().min(1, { message: "Node id is missing" })
})
