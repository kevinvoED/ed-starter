import { Marquee } from "@/components/modules/Marquee/Marquee";

const DATA = {
  _type: "marquee",
  _key: "9f5912ad1f83",
  variant: "text",
  enableVelocity: true,
  imageType: "regular",
  items: [
    {
      _type: "marqueeItem",
      _key: "159bf5d2556a",
      title: [
        {
          _type: "block",
          _key: "162d0db3816d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "1754d9641a03",
              text: "Toronto",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "marqueeItem",
      _key: "ed46478d72f7",
      title: [
        {
          _type: "block",
          _key: "25fa76a29176",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "acfb576d833d",
              text: "Vancouver",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "marqueeItem",
      _key: "d70df59d2128",
      title: [
        {
          _type: "block",
          _key: "72368ae4078e",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "289295471fe0",
              text: "Seoul",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "marqueeItem",
      _key: "8323a8290e13",
      title: [
        {
          _type: "block",
          _key: "d81b61f35cbb",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "8a7b01056071",
              text: "Frankfurt",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "marqueeItem",
      _key: "59420f1160ae",
      title: [
        {
          _type: "block",
          _key: "6355869fbcb2",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "ebf478959301",
              text: "Arlington",
              marks: [],
            },
          ],
        },
      ],
    },
    {
      _type: "marqueeItem",
      _key: "38e36fc13534",
      title: [
        {
          _type: "block",
          _key: "af5d82708542",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "e8b5b3ee8ed9",
              text: "Jakarta",
              marks: [],
            },
          ],
        },
      ],
    },
  ],
};

export const StarterMarquee = () => {
  return (
    // @ts-expect-error: wrong data type for demo
    <Marquee {...DATA} images={[]} />
  );
};
