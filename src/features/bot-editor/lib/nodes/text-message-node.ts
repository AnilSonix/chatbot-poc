import { z } from "zod";
import { BaseNodeSchema } from "./base-node";
import { EditorNodeType } from "./node-type";
export const TextMessageNodeDataSchema = z.object({
    message: z.string().max(250, { message: "Message can't exceed 250 characters" })
})

export type ITextMessageNodeData = z.infer<typeof TextMessageNodeDataSchema>;

export const TextMessageNodeSchema = BaseNodeSchema.extend({
    type: z.literal(EditorNodeType.textMessageNode),
    data: TextMessageNodeDataSchema
})

export type ITextMessageNode = z.infer<typeof TextMessageNodeSchema>;



