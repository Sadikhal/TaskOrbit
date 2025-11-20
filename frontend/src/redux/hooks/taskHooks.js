import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  clearTaskError
} from "../slices/taskSlice";

//  Returns all task-related Redux actions.
export const useTaskActions = () => {
  const dispatch = useDispatch();

  return {
    taskFetch: (params) => dispatch(fetchTasks(params)),
    taskCreate: (data) => dispatch(createTask(data)),
    taskUpdate: (id, data) => dispatch(updateTask({ id, data })),
    taskDelete: (id) => dispatch(deleteTask(id)),
    clearTaskError: () => dispatch(clearTaskError()),
  };
};

//  Returns task list, loading, error, total, perPage, etc.
 
export const useTaskState = () =>
  useSelector((state) => state.tasks);
