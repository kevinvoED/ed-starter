import { type ComponentType, createElement, useCallback } from "react";
import { Button, Flex, Grid, Label, Stack, Text } from "@sanity/ui";
import { type StringInputProps, set } from "sanity";

export type OptionCardItem = {
  title: string;
  value: string;
  description: string;
  icon?: ComponentType;
};

export function createOptionCards(cards: OptionCardItem[]) {
  return function OptionCards(props: StringInputProps) {
    const { value, onChange } = props;
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onChange(set(event.currentTarget.value));
      },
      [onChange],
    );
    return (
      <Grid columns={cards.length} gap={3}>
        {cards.map((card) => (
          <Button
            key={card.value}
            value={card.value}
            mode={value === card.value ? "default" : "ghost"}
            tone={value === card.value ? "primary" : "default"}
            onClick={handleClick}
          >
            <Stack space={3} padding={3}>
              <Flex align="center" justify="space-between">
                <Label>{card.title}</Label>
                {card?.icon && <Text size={2}>{createElement(card.icon)}</Text>}
              </Flex>

              {card?.description && (
                <Text
                  size={1}
                  style={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    paddingTop: "8px",
                    paddingRight: "12px",
                  }}
                >
                  {card.description}
                </Text>
              )}
            </Stack>
          </Button>
        ))}
      </Grid>
    );
  };
}
