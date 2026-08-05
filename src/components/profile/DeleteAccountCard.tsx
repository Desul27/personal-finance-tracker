"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  deleteAccountSchema,
  type DeleteAccountInput,
} from "@/lib/validations/delete-account";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function DeleteAccountCard() {

const [showPassword, setShowPassword] =
  useState(false);

const form = useForm<DeleteAccountInput>({
  resolver: zodResolver(deleteAccountSchema),

  defaultValues: {
    currentPassword: "",
  },
});
const router = useRouter();

const onSubmit = async (
  data: DeleteAccountInput
) => {
  try {
    const response = await fetch(
      "/api/profile/delete-account",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    await signOut({
      redirect: false,
    });

    router.push("/");

  } catch (error) {
    console.error(error);

    toast.error(
      "Something went wrong."
    );
  }
};


  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="text-red-600">
          Hapus Akun
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
         Hapus akun Anda dan semua data pribadi Anda secara permanen. Tindakan ini tidak dapat dibatalkan.
          </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              Hapus Akun
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Hapus Akun?
              </AlertDialogTitle>

              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus akun Anda?

                <br />
                <br />

                Semua transaksi,
                anggaran, dan informasi profil Anda
                akan dihapus secara permanen.
              </AlertDialogDescription>
           <div className="space-y-2 mt-4">
             <Label htmlFor="currentPassword">
              Masukkan kata sandi Anda untuk mengonfirmasi
              </Label>

          <div className="relative">
            <Input
              className="pr-10"
              id="currentPassword"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              {...form.register(
                "currentPassword"
              )}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
              "
            >
              {showPassword ? (
                <EyeOff
                  className="h-4 w-4"
                />
              ) : (
                <Eye
                  className="h-4 w-4"
                />
              )}
            </button>
          </div>
            
          {form.formState.errors
            .currentPassword && (
            <p className="text-sm text-red-500">
              {
                form.formState.errors
                  .currentPassword.message
              }
            </p>
          )}
        </div>

            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>


                <Button
                  variant="destructive"
                  onClick={form.handleSubmit(
                      onSubmit
                  )}
                
                  disabled={
                      form.formState.isSubmitting
                  }
              >
                  {
                      form.formState.isSubmitting
                      ? "Deleting..."
                      : "Delete Account"
                  }
              </Button>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}