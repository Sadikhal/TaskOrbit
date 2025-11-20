import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./ui/InputField";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/Button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "./ui/Select";

import { taskSchema } from "../lib/schema";
import { FaChevronDown } from "react-icons/fa6";

const STATUS_OPTIONS = ["pending", "in-progress", "completed"];

export default function TaskForm({ data, type, setOpen, onSuccess }) {
  const isUpdate = type === "update";
  const [submitting, setSubmitting] = useState(false);
// hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      status: data?.status || "pending",
    },
    mode: "onChange",
  });

  // Sync form when editing  for default value
  useEffect(() => {
    if (isUpdate && data) {
      reset({
        title: data.title,
        description: data.description,
        status: data.status,
      });
    }
  }, [isUpdate, data, reset]);

  // Submit Handler
  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await onSuccess(formData);
      setOpen(false);
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 p-4 font-poppins"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-semibold border-b border-slate-200 pb-2">
        {isUpdate ? "Update Task" : "Create New Task"}
      </h1>

      {/* Title */}
      <InputField
        label="Task Title *"
        name="title"
        type="text"
        register={register}
        error={errors.title}
        placeholder="Enter task title"
      />

      {/* Status */}
      <div className="flex flex-col gap-2 w-full md:w-60">
        <label className="text-xs text-gray-500">Status *</label>

        <Select
          value={watch("status")}
          onValueChange={(value) => setValue("status", value, { shouldValidate: true })}
          disabled={submitting}
        >
          <SelectTrigger className="border-gray-300 border rounded-md text-sm bg-white p-2 shadow-sm flex flex-row justify-between w-full lowercase">
           <SelectValue placeholder="Status" />
            <FaChevronDown className="h-4 w-4" />
          </SelectTrigger>

          <SelectContent className="bg-white">
            <SelectGroup>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.status && (
          <p className="text-xs text-red-400">{errors.status.message}</p>
        )}
      </div>

      {/* Description */}
      <Textarea
        label="Description *"
        name="description"
        register={register}
        error={errors?.description}
        rows={4}
        placeholder="Enter task description..."
        className="ring-gray-300 ring-[1.2px]"
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4">
        <Button
          type="button"
          onClick={() => setOpen(false)}
          disabled={submitting}
          variant="secondary"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={submitting || !isValid}
          variant="primary"
        >
          {submitting
            ? "Processing..."
            : isUpdate
            ? "Update Task"
            : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
