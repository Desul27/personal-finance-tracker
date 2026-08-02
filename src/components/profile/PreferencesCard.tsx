
"use client";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  updatePreferencesSchema,
  type UpdatePreferencesInput,
} from "@/lib/validations/preferences";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreferencesCardProps {
  currency: string;
  timezone: string;
}

export default function PreferencesCard({
  currency,
  timezone,
}: PreferencesCardProps) {
  const router = useRouter();

  const form = useForm<UpdatePreferencesInput>({
    resolver: zodResolver(updatePreferencesSchema),

    defaultValues: {
      currency,
      timezone,
    },
  });

  const onSubmit = async (
    data: UpdatePreferencesInput
  ) => {
    try {
      const response = await fetch(
        "/api/profile/preferences",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
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

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong."
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Preferences
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>
              Currency
            </Label>

            <Controller
              control={form.control}
              name="currency"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="IDR">
                      🇮🇩 Indonesian
                      Rupiah (IDR)
                    </SelectItem>

                    <SelectItem value="USD">
                      🇺🇸 US Dollar
                      (USD)
                    </SelectItem>

                    <SelectItem value="EUR">
                      🇪🇺 Euro (EUR)
                    </SelectItem>

                    <SelectItem value="JPY">
                      🇯🇵 Japanese Yen
                      (JPY)
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {form.formState.errors
              .currency && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .currency.message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Timezone
            </Label>

            <Controller
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">
                      Asia/Jakarta
                    </SelectItem>

                    <SelectItem value="Asia/Makassar">
                      Asia/Makassar
                    </SelectItem>

                    <SelectItem value="Asia/Jayapura">
                      Asia/Jayapura
                    </SelectItem>

                    <SelectItem value="UTC">
                      UTC
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {form.formState.errors
              .timezone && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors
                    .timezone.message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={
              form.formState
                .isSubmitting
            }
          >
            {form.formState
              .isSubmitting
              ? "Saving..."
              : "Save Preferences"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}