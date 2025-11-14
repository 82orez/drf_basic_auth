"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import type { RegisterForm } from "@/types/auth";
import { GoEye } from "react-icons/go";
import { PiEyeClosed } from "react-icons/pi";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await authService.register(formData);
      router.push("/user/auth/sign-in?message=Registration successful! Please log in.");
    } catch (error: any) {
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username[0]}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                    {showPassword ? <GoEye size={22} /> : <PiEyeClosed size={22} />}
                  </button>
                )}
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>}
            </div>

            <div>
              <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  required
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                />
                {formData.password_confirm && (
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                    {showPasswordConfirm ? <GoEye size={22} /> : <PiEyeClosed size={22} />}
                  </button>
                )}
              </div>
              {errors.password_confirm && <p className="mt-1 text-sm text-red-600">{errors.password_confirm[0]}</p>}
            </div>
          </div>

          {errors.non_field_errors && (
            <div className="text-sm text-red-600">
              {errors.non_field_errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50">
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <a href="/user/auth/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
