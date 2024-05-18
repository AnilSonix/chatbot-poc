import { z } from "zod";
import { EditorNodeType } from "./node-type";
import { TextMessageNodeSchema } from "./text-message-node";


const EditorNodeTypeSchema = z.nativeEnum(EditorNodeType);
export type IEditorNodeType = z.infer<typeof EditorNodeTypeSchema>;


export const NodesSchema = z.union([TextMessageNodeSchema, TextMessageNodeSchema]);
export type Nodes = z.infer<typeof TextMessageNodeSchema>;




