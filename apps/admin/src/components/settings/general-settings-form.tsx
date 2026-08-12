"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useSettings, useUpdateSettings } from "@/hooks/use-settings";

import type { GeneralSettings } from "@/types/settings";

const defaultValues: GeneralSettings = {
  siteName: "",
  siteDescription: "",
  logoMediaId: null,
  faviconMediaId: null,
};

type Props = {
  readOnly?: boolean;
};

export function GeneralSettingsForm({ readOnly = false }: Props) {
  const { data: setting, isLoading } = useSettings("general");

  const updateMutation = useUpdateSettings("general");

  const [formError, setFormError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralSettings>({
    defaultValues,
  });

  useEffect(() => {
    if (setting?.value) {
      reset(setting.value);
    }
  }, [setting, reset]);

  async function submit(data: GeneralSettings) {
    if (readOnly) {
      return;
    }

    setFormError(null);
    setSuccessMessage(null);

    try {
      await updateMutation.mutateAsync({
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        logoMediaId: data.logoMediaId,
        faviconMediaId: data.faviconMediaId,
      });

      setSuccessMessage("General settings saved successfully.");
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
          label="Site Name"
          disabled={readOnly}
          error={errors.siteName?.message}
          {...register("siteName", {
            required: "Site name is required",
          })}
        />

        <TextField
          label="Site Description"
          disabled={readOnly}
          error={errors.siteDescription?.message}
          {...register("siteDescription")}
        />

        <TextField
          label="Logo Media ID"
          type="number"
          disabled={readOnly}
          error={errors.logoMediaId?.message}
          {...register("logoMediaId", {
            setValueAs: (value) =>
              value === "" || value == null ? null : Number(value),
          })}
        />

        <TextField
          label="Favicon Media ID"
          type="number"
          disabled={readOnly}
          error={errors.faviconMediaId?.message}
          {...register("faviconMediaId", {
            setValueAs: (value) =>
              value === "" || value == null ? null : Number(value),
          })}
        />

        {!readOnly && (
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save General Settings"}
          </Button>
        )}
      </form>
    </Card>
  );
}
