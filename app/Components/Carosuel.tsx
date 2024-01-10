import Card from "./Card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Carosuel() {
  return (
    <Carousel className="m-16">
      <div className="flex items-center justify-center p-4 text-3xl">
        Newest In!
      </div>
      <CarouselContent>
        <CarouselItem className="basis-1/2 md:basis-1/3">
          <Card />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3">
          <Card />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3">
          <Card />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
