import { useMemo, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Grid,
  Text,
  TextInput,
  Tooltip,
} from "@sanity/ui";
import { type StringInputProps, set, unset } from "sanity";
import { words } from "es-toolkit/string";
import { icons } from "lucide-react";

export const CustomIconPicker = (props: StringInputProps) => {
  const { value, onChange, readOnly } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const onClick = (iconName: string) => {
    if (readOnly) {
      return;
    }

    if (iconName === value) {
      // unselect the current icon
      onChange(unset());
      return;
    }

    onChange(set(iconName));
  };

  const onClear = () => {
    if (readOnly) {
      return;
    }

    onChange(unset());
  };

  const query = words(searchQuery.toLowerCase()).join("");

  const filteredIcons = useMemo(() => {
    return (
      Object.entries(icons)
        // do a lame string match that will ignore spaces in the search query
        .filter(([key]) => key.toLowerCase().includes(query))
        // put the selected icon at the top of the list
        .sort(([key]) => (key === value ? -1 : 1))
    );
  }, [query, value]);

  return (
    <Flex direction="column" gap={3}>
      <Flex align="center" gap={2}>
        <TextInput
          placeholder="Filter icons by name..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          disabled={readOnly}
        />
        {value && !readOnly && (
          <Tooltip
            content={
              <Text muted={true} size={1}>
                Clear the selected icon
              </Text>
            }
            animate={true}
            fallbackPlacements={["right", "left"]}
            placement="top"
            portal={true}
          >
            <Button
              mode="ghost"
              tone="critical"
              text="Clear"
              onClick={onClear}
              style={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
        )}
      </Flex>
      {/* short inner scroller */}
      <Container style={{ height: "300px", overflow: "scroll" }}>
        <Grid gridTemplateColumns={[3]} gap={[4]}>
          {filteredIcons.map(([key, IconComponent]) => (
            <Button
              key={key}
              mode={value === key ? "default" : "ghost"}
              tone={value === key ? "primary" : "default"}
              justify="center"
              padding={[1, 4]}
              style={{
                cursor: "pointer",
                opacity: value === key ? 1 : 0.75,
              }}
              onClick={() => onClick(key)}
              disabled={readOnly}
            >
              <Flex align="center" direction="column" style={{ gap: "1rem" }}>
                <IconComponent />
                <Text
                  weight="semibold"
                  size={1}
                  align="center"
                  style={{ textWrap: "auto" }}
                >
                  {words(key).join(" ")}
                </Text>
              </Flex>
            </Button>
          ))}
        </Grid>
      </Container>
    </Flex>
  );
};
