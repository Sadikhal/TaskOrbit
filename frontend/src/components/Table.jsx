import { cn } from "../lib/utils";
import { ErrorFallback, Loader } from "./ui/Loaders";

const Table = ({ columns, renderRow, data, error, loading }) => {
  return (
    <div>
      {loading ? (
        // loading  
        <Loader />
      ) : error ? (
        <div className="flex items-center justify-center w-full">
          {/* error handling */}
          <ErrorFallback message={error} />
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-scroll">
            <table className="w-full mt-8">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  {/* table headings */}
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={cn(
                        "text-nowrap font-poppins font-medium",
                        col.className
                      )}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="items-start text-start">
                {data && data.length > 0 ? (
                  // Row Rendering
                  data.map(renderRow)
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
