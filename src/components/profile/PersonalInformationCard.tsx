"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validations/profile";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PersonalInformationCardProps {
  name: string;
  // email: string;
}

export default function PersonalInformationCard({
  name,
  // email,
}: PersonalInformationCardProps) {
const router = useRouter();
const form = useForm<UpdateProfileInput>({
  resolver: zodResolver(updateProfileSchema),

  defaultValues: {
    name,
  },
});

const onSubmit = async (data: UpdateProfileInput) => {
  try {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),//mengubah object menjadi string
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                {...form.register("name")} //register() mengembalikan beberapa properti sekaligus.
              />
              {
                form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )
              }
            </div>
          <Button className="mt-3"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : "Save Changes"}
          </Button>
          </form>
        </CardContent>
    </Card>
  );
}