import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/primitives/Tabs/Tabs";

const renderTabs = () =>
  render(
    <Tabs defaultValue="tab-1">
      <TabsList>
        <TabsTrigger value="tab-1">Tab One</TabsTrigger>
        <TabsTrigger value="tab-2">Tab Two</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="tab-1">Content One</TabsContent>
      <TabsContent value="tab-2">Content Two</TabsContent>
    </Tabs>,
  );

describe("Tabs", () => {
  test("renders tab triggers", () => {
    renderTabs();
    expect(screen.getByText("Tab One")).toBeInTheDocument();
    expect(screen.getByText("Tab Two")).toBeInTheDocument();
  });

  test("renders active tab content panel", () => {
    renderTabs();
    // Base UI only mounts the active panel; inactive panels are unmounted
    expect(screen.getByText("Content One")).toBeInTheDocument();
  });

  test("inactive tab content is not in the DOM by default", () => {
    renderTabs();
    expect(screen.queryByText("Content Two")).not.toBeInTheDocument();
  });

  test("tab-1 trigger has aria-selected=true by default", () => {
    renderTabs();
    const tab1 = screen.getByText("Tab One").closest("[role='tab']");
    expect(tab1).toHaveAttribute("aria-selected", "true");
  });

  test("tab-2 trigger has aria-selected=false by default", () => {
    renderTabs();
    const tab2 = screen.getByText("Tab Two").closest("[role='tab']");
    expect(tab2).toHaveAttribute("aria-selected", "false");
  });

  test("tab-2 becomes aria-selected=true after click", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByText("Tab Two"));
    const tab2 = screen.getByText("Tab Two").closest("[role='tab']");
    expect(tab2).toHaveAttribute("aria-selected", "true");
  });

  test("tab-2 panel mounts after clicking tab-2", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByText("Tab Two"));
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  test("tab-1 loses aria-selected after tab-2 is clicked", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByText("Tab Two"));
    const tab1 = screen.getByText("Tab One").closest("[role='tab']");
    expect(tab1).toHaveAttribute("aria-selected", "false");
  });

  test("TabsList renders with flex class", () => {
    const { container } = renderTabs();
    const list = container.querySelector("[role='tablist']");
    expect(list).toHaveClass("flex");
  });

  test("applies custom className to Tabs root", () => {
    const { container } = render(
      <Tabs defaultValue="tab-1" className="custom-tabs">
        <TabsList>
          <TabsTrigger value="tab-1">Tab</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(container.firstChild).toHaveClass("custom-tabs");
  });

  test("applies custom className to TabsList", () => {
    const { container } = render(
      <Tabs defaultValue="tab-1">
        <TabsList className="custom-list">
          <TabsTrigger value="tab-1">Tab</TabsTrigger>
        </TabsList>
      </Tabs>,
    );
    expect(container.querySelector("[role='tablist']")).toHaveClass(
      "custom-list",
    );
  });

  test("applies custom className to TabsContent", () => {
    const { container } = render(
      <Tabs defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1" className="custom-content">
          Content
        </TabsContent>
      </Tabs>,
    );
    expect(container.querySelector("[role='tabpanel']")).toHaveClass(
      "custom-content",
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = renderTabs();
    expect(asFragment()).toMatchSnapshot();
  });
});
