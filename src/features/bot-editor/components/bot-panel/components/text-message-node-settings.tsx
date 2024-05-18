import { Textarea } from "@mantine/core";
import { TextMessageNode } from "../../../nodes/text-message-node";
import useBotEditor from "../../../stores/useBotEditor";

export default function TextMessageNodeSettings({
  nodeId,
}: {
  nodeId: string;
}) {
  const { updateNodeData } = useBotEditor();
  const { nodes } = useBotEditor();

  const node = nodes.find((node) => node.id === nodeId) as
    | TextMessageNode
    | undefined;

  if (!node) {
    return null;
  }

  return (
    <>
      <Textarea
        label="Edit message"
        placeholder="Enter the message"
        maxLength={250}
        maxRows={5}
        autosize
        minRows={3}
        value={node.data.message || ""}
        onChange={(e) =>
          updateNodeData(node.id, {
            ...node.data,
            message: e.target.value || "",
          })
        }
      ></Textarea>
    </>
  );
}
