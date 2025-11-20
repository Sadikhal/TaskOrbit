import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions, useAuthState } from "../redux/hooks/authHooks";

import InputField from "../components/ui/InputField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";
import { profileSchema } from "../lib/schema";


const Profile = () => {
  //redux
  const { user, loading } = useAuthState();
  const { authUpdateUser } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),// profile schema from lib/schema
    mode: "onChange",
  });

  // Prefill form
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("number", user.number || "");
      setValue("age", user.age || "");
    }
  }, [user, setValue]);

  // Submit handler
  const onSubmit = async (formData) => {
    try {
      await authUpdateUser(formData).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err)
      toast.error(err || "Failed to update profile");
    }
  };

  return (
    <div className="p-4 m-2 bg-white rounded-md w-full h-full font-poppins">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-slate-200 pb-2">My Profile</h2>

      {/* Avatar */}
      <div className="w-full flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto flex flex-col gap-6"
      >
        {/* Name */}
        <InputField
          label="Full Name *"
          name="name"
          type="text"
          register={register}
          error={errors.name}
          placeholder="Enter your name"
        />

        {/* Number */}
        <InputField
          label="Phone Number *"
          name="number"
          type="text"
          register={register}
          error={errors.number}
          placeholder="Enter your phone number"
        />

        {/* Age */}
        <InputField
          label="Age *"
          name="age"
          type="number"
          register={register}
          error={errors.age}
          placeholder="Enter your age"
        />

        {/* Email (readonly) */}
        <InputField
          label="Email (read only)"
          name="email"
          type="email"
          defaultValue={user?.email}
          disabled={true}
        />

        {/* Update button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Profile
