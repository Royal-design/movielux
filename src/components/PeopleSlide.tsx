import { PopularPersonCard } from "./PopularPersonCard";
import { Carousel } from "./Carousel";
import type { PersonType } from "@/types/PersonType";

interface PersonProps {
  person: PersonType[];
}

export const PeopleSlide: React.FC<PersonProps> = ({ person }) => {
  return (
    <Carousel
      items={person}
      keyOf={(p) => p.id}
      slideClassName="w-[9.5rem] sm:w-44 md:w-52"
      viewportClassName="py-1"
      renderItem={(p) => <PopularPersonCard person={p} />}
    />
  );
};
