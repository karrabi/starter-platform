"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { SelectField } from "@/components/forms/select-field";
import { TextArea } from "@/components/forms/text-area";
import { TextField } from "@/components/forms/text-field";

import { MediaPicker } from "@/components/media";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { routes } from "@/config/routes";

import type { CreatePageRequest } from "@/types/page";

import {
  createPageSchema,
  type CreatePageFormData,
} from "@/app/(dashboard)/pages/create/schema";

type PageFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<CreatePageFormData>;
  isSubmitting: boolean;
  onSubmit: (data: CreatePageRequest) => Promise<void>;
};

export function PageForm({
  mode,
  initialValues,
  isSubmitting,
  onSubmit,
}: PageFormProps) {
  const router = useRouter();

  // Prevent initial values from resetting the form
  // again while the user is editing.
  const initializedRef = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePageFormData>({
    resolver: zodResolver(createPageSchema),

    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "DRAFT",
      seoTitle: "",
      seoDescription: "",
      seoOgImageId: null,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (!initialValues || initializedRef.current) {
      return;
    }

    reset({
      title: initialValues.title ?? "",
      slug: initialValues.slug ?? "",
      content: initialValues.content ?? "",
      status: initialValues.status ?? "DRAFT",
      seoTitle: initialValues.seoTitle ?? "",
      seoDescription: initialValues.seoDescription ?? "",
      seoOgImageId: initialValues.seoOgImageId ?? null,
    });

    initializedRef.current = true;
  }, [initialValues, reset]);

  async function submit(data: CreatePageFormData) {
    const seo = {
      ...(data.seoTitle && {
        title: data.seoTitle,
      }),

      ...(data.seoDescription && {
        description: data.seoDescription,
      }),

      ...(data.seoOgImageId && {
        ogImageId: data.seoOgImageId,
      }),
    };

    await onSubmit({
      title: data.title,
      slug: data.slug,

      content: {
        body: data.content,
      },

      status: data.status,

      seo: Object.keys(seo).length > 0 ? seo : undefined,
    });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <TextField
          label="Title"
          error={errors.title?.message}
          {...register("title")}
        />

        <TextField
          label="Slug"
          error={errors.slug?.message}
          {...register("slug")}
        />

        <TextArea
          label="Content"
          error={errors.content?.message}
          {...register("content")}
        />

        <SelectField
          label="Status"
          error={errors.status?.message}
          options={[
            {
              label: "Draft",
              value: "DRAFT",
            },
            {
              label: "Published",
              value: "PUBLISHED",
            },
          ]}
          {...register("status")}
        />

        <div className="space-y-4 border-t pt-6">
          <div>
            <h3 className="text-base font-semibold">SEO</h3>

            <p className="text-sm text-gray-500">
              Search engine and social sharing settings
            </p>
          </div>

          <TextField
            label="Meta Title"
            error={errors.seoTitle?.message}
            {...register("seoTitle")}
          />

          <TextArea
            label="Meta Description"
            error={errors.seoDescription?.message}
            {...register("seoDescription")}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">OG Image</label>

            <Controller
              control={control}
              name="seoOgImageId"
              render={({ field }) => (
                <MediaPicker
                  value={field.value ? [field.value] : []}
                  onChange={(ids) => field.onChange(ids[0] ?? null)}
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Page"
                : "Save Changes"}
          </Button>

          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => router.push(routes.pages)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
