import { useState, Suspense, lazy } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import { Loader } from "./ui/Loaders";
import { Button } from "./ui/Button";

// Lazy load the TaskForm once
const TaskForm = lazy(() => import("./TaskForm"));

// simple reusable modal for create, update, delete. 
const FormModal = ({
  type,          // "create" | "update" | "delete"
  data,          // task data for update
  onSuccess,     // callback for create/update
  handleDelete,  // callback for delete
  children       // optional custom trigger
}) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //  button styles 
  const btnStyle = {
    create:
      "bg-lamaYellow hover:bg-lightBlue shadow-lg border border-slate-100 w-12 h-8 p-2 flex items-center justify-center rounded-full",
    update:
      "bg-cyan-700 w-8 h-8 flex items-center justify-center rounded-full",
    delete:
      "bg-[#6c9cad] w-8 h-8 flex items-center justify-center rounded-full",
  };

  // Handle delete submit
  const onDeleteConfirm = async (e) => {
    e.preventDefault();
    if (!handleDelete || isDeleting) return;

    setIsDeleting(true);
    await handleDelete();
    setIsDeleting(false);
    setOpen(false);
  };

  // What gets rendered inside the modal
  const renderContent = () => {
    if (type === "delete") {
      return (
        <form onSubmit={onDeleteConfirm} className="p-4 flex flex-col gap-4">
          <p className="text-center font-medium">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>

          <Button
            type="submit"
            disabled={isDeleting}
            className="bg-error text-white py-2 px-6 rounded-md mx-auto"
          >
            {isDeleting ? (
              <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full" />
            ) : (
              "Delete"
            )}
          </Button>
        </form>
      );
    }

    // Create & Update modal
    return (
      <Suspense fallback={<div className="p-6"><Loader /></div>}>
        <TaskForm
          data={data}
          type={type}
          setOpen={setOpen}
          onSuccess={onSuccess}
        />
      </Suspense>
    );
  };

// dialog handling for deleting, creating, updating
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button className={btnStyle[type]}>
            <img src={`/images/${type}.png`} alt={type} className="w-4 h-4" />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-white rounded-md max-h-[90vh] max-w-[90%] overflow-y-auto">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
