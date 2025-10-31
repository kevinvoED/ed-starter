"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * EXAMPLE USAGE
 * --------------------------------------------------------------
 * Default Transition:
 * <Transition>
 *   <Component>Children</Component>
 * </Transition>
 * --------------------------------------------------------------
 * Transition with a custom animation:
 * <Transition animation="fadeInDown">
 *   <Component>Children</Component>
 * </Transition>
 * --------------------------------------------------------------
 * Transition with a custom duration, delay, and ease:
 * <Transition duration={1.5} delay={0.5} ease="power1.inOut">
 *   <Component>Children</Component>
 * </Transition>
 * --------------------------------------------------------------
 * Transition that triggers on every mount instead of just once:
 * <Transition triggerOnce={false}>
 *   <Component>Children</Component>
 * </Transition>
 * --------------------------------------------------------------
 */

gsap.registerPlugin(ScrollTrigger);

const animationConfig = {
	fadeIn: {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	fadeInUp: {
		from: { opacity: 0, y: 25 },
		to: { opacity: 1, y: 0 },
	},
	fadeInDown: {
		from: { opacity: 0, y: -25 },
		to: { opacity: 1, y: 0 },
	},
	fadeInLeft: {
		from: { opacity: 0, x: -25 },
		to: { opacity: 1, x: 0 },
	},
	fadeInRight: {
		from: { opacity: 0, x: 25 },
		to: { opacity: 1, x: 0 },
	},
};

type animationType =
	| "fadeIn"
	| "fadeInUp"
	| "fadeInDown"
	| "fadeInLeft"
	| "fadeInRight";

type TransitionProps = {
	animation?: animationType;
	duration?: number;
	delay?: number;
	ease?: string;
	className?: string;
	triggerOnce?: boolean;
	children: React.ReactNode;
};

export const Transition = ({
	animation = "fadeInUp",
	duration = 1.2,
	delay = 0,
	ease = "power2.inOut",
	className = "",
	triggerOnce = true,
	children,
}: TransitionProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const config = animationConfig[animation];

	useGSAP(() => {
		if (!ref.current) return;

		gsap.set(ref.current, config.from);

		gsap.to(ref.current, {
			...config.to,
			duration: Number(duration),
			delay: Number(delay),
			ease: ease,
			scrollTrigger: {
				trigger: ref.current,
				start: "top bottom-=100px",
				toggleActions: triggerOnce
					? "play none none none"
					: "play none none reverse",
			},
		});
	}, [animation, duration, delay, triggerOnce]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
};
