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
    <div className="grid-custom p-custom">
      <Accordion
        defaultValue={[DATA?.[1].title]}
        className="col-span-4 col-start-5 my-25"
      >
        {DATA.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
