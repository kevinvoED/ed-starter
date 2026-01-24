import type { ReactNode } from "react";
import { FloatingPortal } from "@floating-ui/react";
import { Transition } from "@/components/GSAP/Transition";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from "@/components/Popover/Popover";
import { cn } from "@/lib/utils";

interface LineData {
  text: string;
  key?: string;
  suffix?: string;
}

const LINE_DATA = [
  { text: "{" },
  { text: "  ", key: "AS", suffix: ": {" },
  { text: '    "NUMBER": 49981,' },
  { text: '    "ORGANIZATION": "WORLDSTREAM"' },
  { text: "  }," },
  { text: "  ", key: "CLIENT", suffix: ": {" },
  { text: '    "BEHAVIORS": ["FILE_SHARING", "TOR_PROXY_USER"],' },
  { text: '    "CONCENTRATION": {' },
  { text: '      "CITY": "POLĀIA KALĀN",' },
  { text: '      "COUNTRY": "IN",' },
  { text: '      "DENSITY": 0.2675,' },
  { text: '      "GEOHASH": "TSN",' },
  { text: '      "SKEW": 6762,' },
  { text: '      "STATE": "MADHYA PRADESH"' },
  { text: "    }," },
  { text: '    "COUNT": 4,' },
  { text: '    "COUNTRIES": 2,' },
  { text: '    "PROXIES": ["ABCPROXY_PROXY", "9PROXY_PROXY",' },
  { text: '    "NETNUT_PROXY", "GOPROXY_PROXY"],' },
  { text: '    "SPREAD": 4724209,' },
  { text: '    "TYPES": ["MOBILE", "DESKTOP"]' },
  { text: "  }," },
  { text: "  ", key: "INFRASTRUCTURE", suffix: ': "DATACENTER",' },
  { text: "  ", key: "IP", suffix: ': "89.39.106.191",' },
  { text: "  ", key: "LOCATION", suffix: ": {" },
  { text: '    "CITY": "AMSTERDAM",' },
  { text: '    "COUNTRY": "NL",' },
  { text: '    "STATE": "NORTH HOLLAND"' },
  { text: "  }," },
  { text: "  ", key: "ORGANIZATION", suffix: ': "WORLDSTREAM B.V.",' },
  { text: "  ", key: "RISKS", suffix: ': ["CALLBACK_PROXY", "TUNNEL",' },
  { text: '  "GEO_MISMATCH"],' },
  { text: "  ", key: "SERVICES", suffix: ': ["OPENVPN"],' },
  { text: "  ", key: "TUNNELS", suffix: ": [" },
  { text: "    {" },
  { text: '      "ANONYMOUS": true,' },
  { text: '      "ENTRIES": ["89.39.106.82"],' },
  { text: '      "OPERATOR": "PROTON_VPN",' },
  { text: '      "TYPE": "VPN"' },
  { text: "    }" },
  { text: "  ]" },
  { text: "}" },
] as LineData[];

const POPOVER_CONTENT: Record<
  string,
  {
    title: string;
    desc: () => ReactNode;
    extra: () => ReactNode;
  }
> = {
  AS: {
    title: "AS (AUTONOMOUS SYSTEM)",
    desc: () => (
      <>
        <strong className="type-body-860">ASN:</strong>{" "}
        <span>The network that owns or routes this IP.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>
          Enables reliable attribution and validates network ownership.
        </span>
      </>
    ),
  },
  CLIENT: {
    title: "CLIENT",
    desc: () => (
      <>
        <span>Observed client and device activity behind the IP.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Reveals shared usage, automation, or proxy-driven behavior.</span>
      </>
    ),
  },
  INFRASTRUCTURE: {
    title: "INFRASTRUCTURE",
    desc: () => (
      <>
        <span>The network environment hosting the IP.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Distinguishes datacenter, residential, and mobile traffic.</span>
      </>
    ),
  },
  IP: {
    title: "IP",
    desc: () => (
      <>
        <span>The IP address under analysis.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Serves as the anchor for correlation and investigation.</span>
      </>
    ),
  },
  LOCATION: {
    title: "LOCATION",
    desc: () => (
      <>
        <span>Verified geographic context for the IP.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Detects geo-mismatch and enforces regional policies.</span>
      </>
    ),
  },
  ORGANIZATION: {
    title: "ORGANIZATION",
    desc: () => (
      <>
        <span>The entity operating or registered to the IP.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Supports ownership attribution and trust decisions.</span>
      </>
    ),
  },
  RISKS: {
    title: "RISKS",
    desc: () => (
      <>
        <span>Risk indicators tied to anonymization or abuse.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Flags behaviors linked to fraud, evasion, or misuse.</span>
      </>
    ),
  },
  SERVICES: {
    title: "SERVICES",
    desc: () => (
      <>
        <span>Detected services running on the IP.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Identifies VPNs, proxies, and anonymization tools.</span>
      </>
    ),
  },
  TUNNELS: {
    title: "TUNNELS",
    desc: () => (
      <>
        <span>Observed VPN or proxy tunnel paths.</span>
      </>
    ),
    extra: () => (
      <>
        <strong className="type-body-860">Why it matters:</strong>{" "}
        <span>Exposes anonymization methods and traffic flow.</span>
      </>
    ),
  },
};

const CodeBackground: React.FC<React.HTMLAttributes<SVGElement>> = ({
  ...rest
}) => (
  <svg
    fill="none"
    viewBox="0 0 475 537"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <title>Code background</title>
    <g stroke="#414141">
      <path d="m55.9061 1.03223v534.83677" opacity=".25" strokeWidth=".5" />
      <path
        d="m28.0818 1.03223.0001 534.83677"
        opacity=".25"
        strokeWidth=".5"
      />
      <path d="m83.7303 1.03223v534.83677" opacity=".25" strokeWidth=".5" />
      <path d="m139.379 1.03223v534.83677" opacity=".25" strokeWidth=".5" />
      <path d="m195.027 1.03223v534.83677" opacity=".25" strokeWidth=".5" />
      <path d="m251.707 1.03223v534.83677" opacity=".25" strokeWidth=".5" />
      <path d="m307.351.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m363 .000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m418.648.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m111.555.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m223.883.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m-0 446.986h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m-0 506.751h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 476.868h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 417.095h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 357.337h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 297.564h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 237.798h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 178.025h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 118.251h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m1.03125 58.4816h473.00575" opacity=".25" strokeWidth=".5" />
      <path d="m-0 387.217h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m279.531.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m390.824.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m335.176.000977v535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m446.472.000977.001 535.867023" opacity=".25" strokeWidth=".5" />
      <path d="m167.203 1.03223v535.86777" opacity=".25" strokeWidth=".5" />
      <path d="m-0 327.451h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m-0 267.678h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m-0 207.908h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m-0 148.143h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m-0 88.3654h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m-0 28.5998h473.006" opacity=".25" strokeWidth=".5" />
      <path d="m28.4609 24v9" />
      <path d="m32.9609 28.5h-9" />
      <path d="m445.5 24v9" />
      <path d="m450 28.5h-9" />
      <path d="m446.5 502v9" />
      <path d="m451 506.5h-9" />
      <path d="m27.5 502v9" />
      <path d="m32 506.5h-9" />
    </g>
  </svg>
);

export const ContextApiExample = () => {
  return (
    <>
      <div className="type-mono-1240 relative px-8 py-11 text-n-03">
        <CodeBackground className="absolute inset-0 -z-10" />
        <FloatingPortal />
        <div className="mb-4">
          {"> "}SRC{" {} "}.JSON
        </div>
        <div className="before:scrim-to-bottom-70 aspect-[0.88] min-h-full overflow-scroll">
          <div>
            {LINE_DATA.map((line, index) => (
              <div
                key={`${line.text}${index}`}
                className={cn([
                  "code-line flex",
                  index === 0 && "is-first-line",
                  index === LINE_DATA.length - 1 && "is-last-line",
                ])}
              >
                <Transition delay={0.05 * index} animation="fadeInLeft">
                  <span className="w-12 shrink-0 select-none pr-2 pl-1 text-right">
                    {index < 9 ? <>&nbsp;</> : ""}
                    {index + 1}
                  </span>
                </Transition>
                <Transition
                  delay={0.05 * index}
                  key={index}
                  className="group flex whitespace-nowrap"
                >
                  <div className="flex overflow-hidden">
                    <span className="whitespace-pre">{line.text}</span>

                    {line.key && (
                      <TooltipDisplay
                        label={line.key}
                        {...POPOVER_CONTENT[line.key]}
                      />
                    )}

                    <span>{line.suffix}</span>
                  </div>
                </Transition>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="type-mono-1040 mt-12 text-n-02 uppercase">
        All data shown is for demonstration purposes only. Actual enrichment
        results depend on your spur subscription and delivery method.
      </p>
    </>
  );
};

interface TooltipProps {
  label: keyof typeof POPOVER_CONTENT;
  title: string;
  desc: () => ReactNode;
  extra: () => ReactNode;
}

const TooltipDisplay = ({ label, title, desc, extra }: TooltipProps) => (
  <Popover placement="top-start" padding={80}>
    <PopoverTrigger className="group relative px-0.5 transition-colors duration-500 ease-in-out hover:bg-neon hover:text-black data-[state=open]:bg-neon data-[state=open]:text-black">
      "
      <span className="text-neon transition-colors duration-500 group-hover:text-inherit group-data-[state=open]:text-inherit">
        {label}
      </span>
      "
    </PopoverTrigger>
    <PopoverContent className="group">
      <div className="w-48 space-y-3 bg-neon p-2 transition-opacity duration-500 ease-in-out group-data-[status=close]:opacity-0 group-data-[status=initial]:opacity-0 group-data-[status=open]:opacity-100 group-data-[status=open]:delay-75">
        <PopoverHeading className="type-mono-1040 uppercase">
          {title}
        </PopoverHeading>
        {desc && (
          <PopoverDescription className="type-body-840">
            {desc()}
          </PopoverDescription>
        )}
        {extra && (
          <PopoverDescription className="type-body-840">
            {extra()}
          </PopoverDescription>
        )}
      </div>
    </PopoverContent>
  </Popover>
);

export default ContextApiExample;
