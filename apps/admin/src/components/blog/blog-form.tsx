"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { SelectField } from "@/components/forms/select-field";
import { TextArea } from "@/components/forms/text-area";
import { TextField } from "@/components/forms/text-field";

import { MediaPicker } from "@/components/media";
import { CategoryPicker } from "@/components/category/category-picker";
import { TagPicker } from "@/components/tag/tag-picker";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { routes } from "@/config/routes";

import type { CreateBlogRequest } from "@/types/blog";

import {
  createBlogSchema,
  type CreateBlogFormData,
} from "@/app/(dashboard)/blog/create/schema";

type BlogFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<CreateBlogFormData>;
  isSubmitting: boolean;
  onSubmit: (data: CreateBlogRequest) => Promise<void>;
};

export function BlogForm({
  mode,
  initialValues,
  isSubmitting,
  onSubmit,
}: BlogFormProps) {
  const router = useRouter();
  const initializedRef = useRef(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema),

    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      status: "DRAFT",
      categoryIds: [],
      tagIds: [],
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
      summary: initialValues.summary ?? "",
      content: initialValues.content ?? "",
      status: initialValues.status ?? "DRAFT",
      categoryIds: initialValues.categoryIds ?? [],
      tagIds: initialValues.tagIds ?? [],
      seoTitle: initialValues.seoTitle ?? "",
      seoDescription: initialValues.seoDescription ?? "",
      seoOgImageId: initialValues.seoOgImageId ?? null,
    });

    initializedRef.current = true;
  }, [initialValues, reset]);

  async function submit(data: CreateBlogFormData) {
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
      summary: data.summary || null,

      content: {
        body: data.content,
      },

      status: data.status,

      categoryIds: data.categoryIds,
      tagIds: data.tagIds,

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
          label="Summary"
          error={errors.summary?.message}
          {...register("summary")}
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>

          <Controller
            control={control}
            name="categoryIds"
            render={({ field }) => (
              <CategoryPicker
                type="BLOG"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>

          <Controller
            control={control}
            name="tagIds"
            render={({ field }) => (
              <TagPicker
                type="BLOG"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

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
                  onChange={(ids) => {
                    field.onChange(ids[0] ?? null);
                  }}
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
                ? "Create Blog"
                : "Save Changes"}
          </Button>

          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => router.push(routes.blog)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
