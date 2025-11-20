import { Button } from "./ui/Button";

export default function Pagination({ currentPage, setCurrentPage, totalPages }) {
  if (!totalPages || totalPages < 1) return null;

  // Go to previous page
  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Go to next page
  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center w-full items-center gap-3 mt-4 text-gray-600">

      {/* Prev Button */}
      <Button
        onClick={prev}
        disabled={currentPage === 1}
        className="py-1 px-4 h-8 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 h-8"
      >
        Prev
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 w-full justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`py-1 px-4 h-8 rounded-md text-sm ${
              currentPage === num ? "bg-lamaSky text-white" : "bg-slate-100"
            }`}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={next}
        disabled={currentPage === totalPages}
        className="py-1 px-4 h-8 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
}
