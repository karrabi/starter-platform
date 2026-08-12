"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useSettings, useUpdateSettings } from "@/hooks/use-settings";

import type { SeoSettings } from "@/types/settings";

const defaultValues: SeoSettings = {
  defaultTitle: "",
  titleTemplate: "",
  defaultDescription: "",
  defaultOgImageId: null,
};

type Props = {
  readOnly?: boolean;
};

export function SeoSettingsForm({ readOnly = false }: Props) {
  const { data: setting, isLoading } = useSettings("seo");

  const updateMutation = useUpdateSettings("seo");

  const [formError, setFormError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SeoSettings>({
    defaultValues,
  });

  useEffect(() => {
    if (setting?.value) {
      reset(setting.value);
    }
  }, [setting, reset]);

  async function submit(data: SeoSettings) {
    if (readOnly) {
      return;
    }

    setFormError(null);
    setSuccessMessage(null);

    try {
      await updateMutation.mutateAsync(data);

      setSuccessMessage("SEO settings saved successfully.");
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
          <h2 className="text-lg font-semibold">SEO</h2>

          <p className="text-sm text-gray-500">
            Configure default website SEO settings.
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
          label="Default Title"
          disabled={readOnly}
          error={errors.defaultTitle?.message}
          {...register("defaultTitle")}
        />

        <TextField
          label="Title Template"
          disabled={readOnly}
          error={errors.titleTemplate?.message}
          {...register("titleTemplate")}
        />

        <TextField
          label="Default Description"
          disabled={readOnly}
          error={errors.defaultDescription?.message}
          {...register("defaultDescription")}
        />

        <TextField
          label="Default OG Image Media ID"
          type="number"
          disabled={readOnly}
          error={errors.defaultOgImageId?.message}
          {...register("defaultOgImageId", {
            setValueAs: (value) =>
              value === "" || value == null ? null : Number(value),
          })}
        />

        {!readOnly && (
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save SEO Settings"}
          </Button>
        )}
      </form>
    </Card>
  );
}
