import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/primitives/Accordion/Accordion";

const DATA = [
  {
    title: "What are your shipping options?",
    content:
      "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.",
  },
  {
    title: "What is your return policy?",
    content:
      "Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7 business days.",
  },
  {
    title: "How can I contact customer support?",
    content:
      "Reach us via email, live chat, or phone. We respond within 24 hours during business days.",
  },
];

export default async function EDAccordionPage() {
  return (
    <div className="grid-custom my-10 gap-y-25 p-custom">
      <div className="col-span-4 col-start-5 flex flex-col gap-4">
        <h2 className="font-bold">Basic Usage: Flex</h2>
        <Accordion
          defaultValue={[DATA?.[1].title]}
          className="col-span-4 col-start-5"
        >
          {DATA.map((item, index) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger display="grid" className="gap-2">
                <div className="col-span-1">0{index + 1}</div>
                <span className="col-span-8 col-start-3"> {item.title}</span>
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="col-span-4 col-start-5 flex flex-col gap-4">
        <h2 className="font-bold">Basic Usage: Grid</h2>
        <Accordion
          defaultValue={[DATA?.[1].title]}
          className="col-span-4 col-start-5"
        >
          {DATA.map((item, index) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger display="grid" className="gap-2">
                <div className="col-span-1">0{index + 1}</div>
                <span className="col-span-8 col-start-3"> {item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="col-start-2">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
