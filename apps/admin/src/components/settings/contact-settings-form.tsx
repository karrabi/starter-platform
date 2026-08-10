"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useSettings, useUpdateSettings } from "@/hooks/use-settings";

import type { ContactSettings } from "@/types/settings";

const defaultValues: ContactSettings = {
  email: "",
  phone: "",
  address: "",
};

export function ContactSettingsForm() {
  const { data: setting, isLoading } = useSettings("contact");

  const updateMutation = useUpdateSettings("contact");

  const [formError, setFormError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSettings>({
    defaultValues,
  });

  useEffect(() => {
    if (setting?.value) {
      reset(setting.value);
    }
  }, [setting, reset]);

  async function submit(data: ContactSettings) {
    setFormError(null);
    setSuccessMessage(null);

    try {
      await updateMutation.mutateAsync(data);

      setSuccessMessage("Contact settings saved successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (typeof message === "string") {
          setFormError(message);
          return;
        }
      }

      setFormError("An unexpected error occurred.");
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Contact</h2>

          <p className="text-sm text-gray-500">
            Configure website contact information.
          </p>
        </div>

        {formError && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        {successMessage && (
          <div className="rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <TextField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <TextField
          label="Phone"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <TextField
          label="Address"
          error={errors.address?.message}
          {...register("address")}
        />

        <Button type="submit" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "Saving..." : "Save Contact Settings"}
        </Button>
      </form>
    </Card>
  );
}
