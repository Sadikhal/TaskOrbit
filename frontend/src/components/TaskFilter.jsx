import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "./ui/Select";
import { FaChevronDown } from "react-icons/fa6";

const statuses = ["pending", "in-progress", "completed"];

//fltering of tasks based on status
const TaskFilter = ({ value, onChange }) => {
  return (
    <Select
      value={value === "" ? "all" : value}
      onValueChange={(val) => onChange(val === "all" ? "" : val)}
    >
      <SelectTrigger className="border-gray-200 border rounded-xl text-sm bg-white w-full flex items-center justify-between p-2 shadow-sm cursor-pointer">
        <SelectValue placeholder="Status" />
        <FaChevronDown className="h-4 w-4" />
      </SelectTrigger>

      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>

          {statuses.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TaskFilter;
