"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useSettings, useUpdateSettings } from "@/hooks/use-settings";

import type { SocialSettings } from "@/types/settings";

const defaultValues: SocialSettings = {
  facebook: "",
  instagram: "",
  linkedin: "",
  x: "",
  youtube: "",
};

type Props = {
  readOnly?: boolean;
};

export function SocialSettingsForm({ readOnly = false }: Props) {
  const { data: setting, isLoading } = useSettings("social");

  const updateMutation = useUpdateSettings("social");

  const [formError, setFormError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<SocialSettings>({
    defaultValues,
  });

  useEffect(() => {
    if (setting?.value) {
      reset(setting.value);
    }
  }, [setting, reset]);

  async function submit(data: SocialSettings) {
    if (readOnly) {
      return;
    }

    setFormError(null);
    setSuccessMessage(null);

    try {
      await updateMutation.mutateAsync(data);

      setSuccessMessage("Social settings saved successfully.");
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
          <h2 className="text-lg font-semibold">Social Media</h2>

          <p className="text-sm text-gray-500">
            Configure website social media links.
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
          label="Facebook"
          disabled={readOnly}
          {...register("facebook")}
        />

        <TextField
          label="Instagram"
          disabled={readOnly}
          {...register("instagram")}
        />

        <TextField
          label="LinkedIn"
          disabled={readOnly}
          {...register("linkedin")}
        />

        <TextField label="X" disabled={readOnly} {...register("x")} />

        <TextField
          label="YouTube"
          disabled={readOnly}
          {...register("youtube")}
        />

        {!readOnly && (
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Social Settings"}
          </Button>
        )}
      </form>
    </Card>
  );
}
