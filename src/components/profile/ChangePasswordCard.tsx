"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/lib/validations/password";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";


export default function ChangePasswordCard() {
    const [showPassword, setShowPassword] =
  useState({
    current: false,
    next: false,
    confirm: false,
  });

  const togglePasswordVisibility = (
  field: "current" | "next" | "confirm"
) => {
  setShowPassword((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));
};
    

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    data: ChangePasswordInput
  ) => {
    try {
      const response = await fetch(
        "/api/profile/password",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      form.reset();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              Current Password
            </Label>
        <div className="relative">
            <Input
            className="pr-10"
              id="currentPassword"
              type={
                  showPassword.current
                    ? "text"
                    : "password"
                }
              {...form.register("currentPassword")}
            />
            <button 
            type="button"
            className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                
                "
            onClick={() =>
                    togglePasswordVisibility("current")
                } >
               {
                    showPassword.current
                        ? <EyeOff />
                        : <Eye />
                }
            </button>
            </div>

            {form.formState.errors.currentPassword && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .currentPassword.message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              New Password
            </Label>
            <div className="relative">
            <Input
              id="newPassword"
              type={
                  showPassword.next
                    ? "text"
                    : "password"
                }
              {...form.register("newPassword")}
            />

            <button 
            type="button"
            className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                
                "
            onClick={() =>
                    togglePasswordVisibility("next")
                } >
               {
                    showPassword.next
                        ? <EyeOff />
                        : <Eye />
                }
            </button>

         </div>
            {form.formState.errors.newPassword && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .newPassword.message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <div className="relative">
            <Input
              id="confirmPassword"
              type={
                  showPassword.confirm
                    ? "text"
                    : "password"
                }
              {...form.register(
                "confirmPassword"
              )}
            />
            <button 
            type="button"
            className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                
                "
            onClick={() =>
                    togglePasswordVisibility("confirm")
                } >
               {
                    showPassword.confirm
                        ? <EyeOff />
                        : <Eye />
                }
            </button>

            </div>

            {form.formState.errors
              .confirmPassword && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .confirmPassword.message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={
              form.formState.isSubmitting
            }
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : "Save Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}