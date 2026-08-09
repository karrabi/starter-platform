"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { TextArea } from "@/components/forms/text-area";
import { TextField } from "@/components/forms/text-field";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { routes } from "@/config/routes";

import type { CreateMenuRequest } from "@/types/navigation";

import {
  menuSchema,
  type MenuFormData,
} from "@/app/(dashboard)/navigation/create/schema";

type MenuFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<MenuFormData>;
  isSubmitting: boolean;
  onSubmit: (data: CreateMenuRequest) => Promise<void>;
};

export function MenuForm({
  mode,
  initialValues,
  isSubmitting,
  onSubmit,
}: MenuFormProps) {
  const router = useRouter();

  const initializedRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),

    defaultValues: {
      name: "",
      description: "",
      ...initialValues,
    },
  });

  useEffect(() => {
    if (!initialValues || initializedRef.current) {
      return;
    }

    reset({
      name: initialValues.name ?? "",
      description: initialValues.description ?? "",
    });

    initializedRef.current = true;
  }, [initialValues, reset]);

  async function submit(data: MenuFormData) {
    await onSubmit({
      name: data.name,
      description: data.description || null,
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <TextField
          label="Name"
          error={errors.name?.message}
          {...register("name")}
        />

        <TextArea
          label="Description"
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Menu"
                : "Save Changes"}
          </Button>

          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => router.push(routes.navigation)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
