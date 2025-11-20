import { useEffect } from "react";
import StatCard from "../components/StatCard";
import { formatDateTime } from "../lib/utils";
import { Loader } from "../components/ui/Loaders";
import { useTaskActions, useTaskState } from "../redux/hooks/taskHooks";


const Dashboard = () => {

  // using task state
  const { list, loading, total } = useTaskState();

  // using task actions
  const { taskFetch } = useTaskActions();

  // fetch tasks
  useEffect(() => {
    taskFetch();   // fetch all tasks
  }, []);

  // calculating the number tasks based on it's status
  const completed = list.filter((task) => task.status === "completed").length;
  const pending = list.filter((task) => task.status === "pending").length;
  const inProgress = list.filter((task) => task.status === "in-progress").length;

  return (
    <div className="p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Overview</h1>

      {/* Stats Row based on status*/}
      <div className="flex gap-4 justify-between flex-wrap">
        <StatCard type="Total Tasks" value={total} />
        <StatCard type="Completed" value={completed} />
        <StatCard type="Pending" value={pending} />
        <StatCard type="In Progress" value={inProgress} />
      </div>

      {/* Recent Tasks */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Recent tasks</h2>

        {loading ? (
          <Loader />
        ) : total === 0 ? (
          <div className="h-20 w-full flex justify-center items-center">
            <p className="font-light text-sm italic font-poppins text-[#b1aaaa]">
              No Tasks found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.slice(0, 5).map((task) => (
              <div
                key={task._id}
                className="p-3 bg-white rounded border border-slate-100 shadow-sm"
              >
                <div className="flex items-center justify-between">

                  {/* Left Section */}
                  <div>
                    <div className="font-medium text-slate-800">
                      {task.title}
                    </div>
                    <div className="md:text-sm text-xs text-[#989595]">
                      {task.description}
                    </div>
                  </div>

                  {/* Right Section (Created Time) */}
                  <div className="text-xs text-slate-400 hidden md:block">
                    {formatDateTime(task.createdAt)}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
export default Dashboard
