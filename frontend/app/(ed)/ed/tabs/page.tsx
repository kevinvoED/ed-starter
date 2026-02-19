import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/primitives/Tabs/Tabs";

const DATA = [
  {
    title: "Overview",
    content:
      "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.",
  },
  {
    title: "Projects",
    content:
      "Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7 business days.",
  },
  {
    title: "Account",
    content:
      "Reach us via email, live chat, or phone. We respond within 24 hours during business days.",
  },
];

export default async function EDTabsPage() {
  return (
    <div className="grid-custom min-h-dvh place-items-center p-custom">
      <Tabs
        className="col-span-full lg:col-span-4 lg:col-start-5"
        defaultValue={DATA?.[0].title}
      >
        <TabsList>
          {DATA.map((item) => (
            <TabsTrigger key={item.title} value={item.title}>
              {item.title}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
        {DATA.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
