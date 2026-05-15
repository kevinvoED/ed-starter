import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/primitives/Sheet/Sheet";

export const StarterSheet = () => {
  return (
    <div className="grid-custom place-items-center p-custom">
      <div className="col-span-4 col-start-5">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1">Hello</div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
