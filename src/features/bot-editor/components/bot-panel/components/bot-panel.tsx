import { Box, Center, Flex, SegmentedControl, rem } from "@mantine/core";
import { IconBox, IconPackageExport, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { match } from "ts-pattern";
import ExportPanel from "./export-panel";
import NodesPanel from "./nodes-panel";
import SettingsPanel from "./settings-panel";

type Panel = "nodes" | "settings" | "export";

export default function BotPanel() {
  const [panel, setPanel] = useState<Panel>("nodes");

  return (
    <>
      <Flex style={{ flexDirection: "column" }} h="100%">
        <SegmentedControl
          value={panel}
          onChange={(e) => setPanel(e as Panel)}
          data={[
            {
              value: "nodes",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconBox style={{ width: rem(16), height: rem(16) }} />
                  <span>Nodes</span>
                </Center>
              ),
            },
            {
              value: "settings",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconSettings style={{ width: rem(16), height: rem(16) }} />
                  <span>Settings</span>
                </Center>
              ),
            },
            {
              value: "export",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconPackageExport
                    style={{ width: rem(16), height: rem(16) }}
                  />
                  <span>Export</span>
                </Center>
              ),
            },
          ]}
        />
        <Box style={{ flex: 1 }}>
          {match(panel)
            .with("nodes", () => <NodesPanel />)
            .with("export", () => <ExportPanel />)
            .with("settings", () => <SettingsPanel />)
            .exhaustive()}
        </Box>
      </Flex>
    </>
  );
}
