import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import FormModal from "../components/FormModal";
import Table from "../components/Table";
import TableSearch from "../components/TableSearch";
import TaskFilter from "../components/TaskFilter";
import Pagination from "../components/Pagination";
import { Button } from "../components/ui/Button";
import { columns, formatDateTime } from "../lib/utils";
import { useTaskActions, useTaskState } from "../redux/hooks/taskHooks";


const Tasks = () => {
  // using hooks for task actions
  const { taskFetch, taskCreate, taskUpdate, taskDelete } = useTaskActions();

  // using hooks for states
  const { list, loading, error, total, perPage } = useTaskState();

  // search params for searching which stored in URL
  const [params, setParams] = useSearchParams();

  const search = params.get("search") || "";
  const status = params.get("status") || "";
  const sortOrder = params.get("sort") || "newest";
  const currentPage = Number(params.get("page") || 1);

  const pageSize = perPage || 2;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // To update search params
  const updateParams = (updates) => {
    setParams({
      search,
      status,
      sort: sortOrder,
      page: currentPage,
      ...updates,
    });
  };

  // fetch tasks
  useEffect(() => {
    taskFetch({
      search,
      status,
      sort: sortOrder,
      page: currentPage,
      limit: pageSize,
    });
  }, [search, status, sortOrder, currentPage, pageSize]);

  // searching tasks
  const handleSearch = (value) => {
    if (value === search) return;
    updateParams({ search: value, page: 1 });
  };

  // filtering tasks based on status
  const handleStatusChange = (value) => {
    updateParams({ status: value, page: 1 });
  };

  // sorting tasks based on createdAt
  const handleSort = () => {
    updateParams({
      sort: sortOrder === "newest" ? "oldest" : "newest",
      page: 1,
    });
  };

  // updating page in pagination
  const changePage = (page) => {
    updateParams({ page });
  };

  // handling creation of tasks
  const handleCreate = async (data) => {
    try {
      await taskCreate(data).unwrap();
      toast.success("Task created");
      updateParams({ page: 1 });
    } catch (err) {
      toast.error(err || "Failed to create task");
    }
  };

  // handling updation of tasks
  const handleUpdate = async (id, data) => {
    try {
      await taskUpdate({ id, data }).unwrap();
      toast.success("Task updated");
    } catch (err) {
      toast.error(err || "Failed to update task");
    }
  };

  // handling deletion of tasks
  const handleDelete = async (id) => {
    try {
      await taskDelete(id).unwrap();
      toast.success("Task deleted");

      // Auto move to previous page if last item deleted
      if (list.length === 1 && currentPage > 1) {
        changePage(currentPage - 1);
      }
    } catch (err) {
      toast.error(err || "Failed to delete task");
    }
  };

  // background color based on status
  const getBadgeClass = (status) => {
    if (status === "completed") return "bg-inputGreen text-warning";
    if (status === "pending") return "bg-inputGreen text-lamaSky";
    return "bg-inputGreen text-lightGreen";
  };

  // Table Row Rendering
  const renderRow = (item) => (
    <tr
      key={item?._id}
      className="border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight text-sm"
    >
      <td className="px-2 py-5 min-w-40 capitalize">{item?.title}</td>
      <td className="px-2 min-w-40">{item?.description}</td>

      <td className="px-2">
        <span
          className={`px-2 py-1 rounded-full text-xs ${getBadgeClass(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </td>

      <td className="px-3 text-nowrap">{formatDateTime(item?.createdAt)}</td>

      <td className="px-4 py-4 flex gap-2">
        {/* dialog for updating of tasks */}
        <FormModal
          type="update"
          table="TaskForm"
          data={item}
          onSuccess={(data) => handleUpdate(item?._id, data)}
        />
        {/* dialog for deletion of tasks */}
        <FormModal
          type="delete"
          table="TaskForm"
          handleDelete={() => handleDelete(item?._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-2 mt-0 w-full h-full">

      {/* Top Bar */}
      <div className="flex md:items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold">All tasks</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-[60%] md:w-auto">

          {/* searching functionalities */}
          <TableSearch
            onSearch={handleSearch}
            placeholder="Search tasks..."
            initialValue={search}
          />

          <div className="flex items-center gap-4 mr-7 sm:mr-0">
            {/* filter functionalities */}
            <TaskFilter value={status} onChange={handleStatusChange} />

            {/* sorting ui */}
            <Button
              onClick={handleSort}
              className="w-[57px] h-8 p-1 rounded-full bg-lamaYellow shadow-lg border border-slate-100 hover:bg-lightBlue"
            >
              <img src="/images/sort.png" className="w-4 h-4" />
            </Button>

            {/* dialog for creation of tasks */}
            <FormModal type="create" table="TaskForm" onSuccess={handleCreate} />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        renderRow={renderRow}
        data={list}
        loading={loading}
        error={error}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={changePage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
export default Tasks
