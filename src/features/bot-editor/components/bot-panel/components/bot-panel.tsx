import { Flex } from "@mantine/core";
import NodesPanel from "./nodes-panel";

export default function BotPanel() {
  return (
    <>
      <Flex style={{ flexDirection: "column" }} h="100%">
        <NodesPanel />
      </Flex>
    </>
  );
}
