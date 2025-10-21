import Link from "next/link";

export default async function Page() {
	return (
		<div className="relative">
			<div className="relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]">
				<div className="absolute top-0 h-full w-full bg-linear-to-b from-white"></div>
				<div className="container">
					<div className="relative mx-auto flex min-h-[40vh] max-w-2xl flex-col items-center justify-center space-y-6 pt-10 pb-30 lg:max-w-4xl lg:px-12 xl:pt-20">
						<div className="flex flex-col items-center gap-4">
							<div className="prose px-3 py-1 font-mono text-md uppercase italic leading-6">
								A starter template for
							</div>
							<h1 className="font-bold text-5xl text-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
								<Link
									className="underline decoration-brand underline-offset-8 transition-all ease-out hover:text-brand hover:underline-offset-4"
									href="https://sanity.io/"
								>
									Sanity
								</Link>
								+
								<Link
									className="text-framework underline decoration-black underline-offset-8 transition-all ease-out hover:underline-offset-4"
									href="https://nextjs.org/"
								>
									Next.js
								</Link>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
