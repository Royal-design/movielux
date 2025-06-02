import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "./ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isDisabled: boolean;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isDisabled
}: PaginationProps) => (
  <div className="flex justify-center gap-4 mt-6">
    <Button
      onClick={onPrevious}
      disabled={currentPage === 1 || isDisabled}
      className="disabled:opacity-50 hover:bg-transparent bg-transparent"
    >
      <IoIosArrowRoundBack className="text-white/80 size-8" />
    </Button>
    <span className="flex items-center text-xs">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      onClick={onNext}
      disabled={currentPage === totalPages || isDisabled}
      className="disabled:opacity-50 hover:bg-transparent bg-transparent"
    >
      <IoIosArrowRoundForward className="text-white/80 size-8" />
    </Button>
  </div>
);
