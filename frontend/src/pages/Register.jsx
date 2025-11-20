import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginInput from "../components/ui/LoginInput";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { SecondaryHoveredButton } from "../components/ui/StyledButtons";
import { Button } from "../components/ui/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useAuthActions, useAuthState } from "../redux/hooks/authHooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  // Redux hooks
  const { authRegister } = useAuthActions();
  const { loading } = useAuthState();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const passwordValue = watch("password", "");

  // handling showing password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Submit handler with unwrap()
  const onSubmit = async (formData) => {
    try {
      await authRegister(formData).unwrap(); 
      toast.success("Account created successfully!");
      navigate("/auth/login");
    } catch (errMessage) {
      toast.error(errMessage);
    }
  };

  return (
    <div className='w-full flex items-center justify-center h-full bg-lamaWhite xl:py-12'>
      <div className='xl:w-[60%] w-[95%] md:w-[60%] xl:h-auto justify-between items-center h-full flex flex-col-reverse xl:flex-row-reverse shadow-2xl xl:mb-0 mt-2 mb-4 xl:mt-0 py-8 xl:py-3 xl:pb-5'>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full xl:w-[52%] border-t xl:border-none border-slate-100 h-full justify-center items-center'>
          <div className='flex h-full w-[85%] xl:pr-6 pr-2 xl:mt-12 mt-4'>
            <div className='flex h-full items-center w-full flex-col gap-8'>

              <div className='font-bold capitalize md:text-[28px] xl:w-[90%] w-full text-2xl pt-4 xl:pt-0 font-robotos text-[#0a151d] justify-center items-center text-center'>
                Create Your Account
              </div>

              <div className='w-full flex justify-center items-center flex-col xl:pt-4'>
                <div className='font-normal w-full items-center justify-center gap-5 text-base flex flex-col'>

                  {/* FULL NAME */}
                  <LoginInput
                    label="Full Name"
                    type='text'
                    name='name'
                    register={register}
                    error={errors?.name}
                    validation={{
                      required: "Name is required",
                      minLength: {
                        value: 4,
                        message: "Name must be at least 4 characters",
                      },
                      maxLength: {
                        value: 15,
                        message: "Name must be at maximum 15 characters",
                      },
                    }}
                  />

                  {/* EMAIL */}
                  <LoginInput
                    label="Email"
                    type="email"
                    name="email"
                    register={register}
                    error={errors?.email}
                    validation={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />

                  {/* PHONE NUMBER */}
                  <LoginInput
                    label="Phone Number"
                    name="number"
                    type="text"
                    register={register}
                    error={errors?.number}
                    validation={{
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                      },
                    }}
                  />

                  {/* PASSWORD */}
                  <div className="relative w-full">
                    <LoginInput
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      register={register}
                      error={errors?.password}
                      validation={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Must contain uppercase, lowercase, number & special character",
                        },
                      }}
                    />

                    <Button
                      type="button"
                      className="absolute right-3 top-0 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </Button>
                  </div>

                  {/* PASSWORD STRENGTH */}
                  <PasswordStrengthMeter password={passwordValue} />
                </div>

                {/* SUBMIT BUTTON */}
                <Button variant="gradient" size="gradient" loading={loading}>
                  Sign up
                </Button>
              </div>

            </div>
          </div>
        </form>

        {/* SIDE IMAGE SECTION */}
        <div className='w-full xl:w-[48%] h-96 md:h-full xl:h-full flex justify-center items-center text-center rounded-t-lg xl:rounded-t-none flex-col bg-[#ffffff] border-l border-slate-100'>
          <div className="h-full flex flex-col w-full items-center justify-center">
            <img src="/images/login1.jpg" className="w-60 h-60 object-contain rounded-2xl" alt="login" />
            <div className='flex items-center justify-center flex-col gap-3 w-[90%] mt-5 pl-4 md:mt-8'>
              <div className='font-normal text-[15px] md:text-base text-black font-poppins'>
                Enter your personal details and start your journey with us
              </div>
              {/* animated button / */}
              <div className='xl:pt-6 pt-4'>
                <SecondaryHoveredButton href="/auth/login" title="login" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
