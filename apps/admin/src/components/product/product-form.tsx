"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { CheckboxField } from "@/components/forms/checkbox-field";
import { SelectField } from "@/components/forms/select-field";
import { TextArea } from "@/components/forms/text-area";
import { TextField } from "@/components/forms/text-field";
import { MediaPicker } from "@/components/media";
import { CategoryPicker } from "@/components/category/category-picker";
import { TagPicker } from "@/components/tag/tag-picker";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { routes } from "@/config/routes";

import type { CreateProductRequest } from "@/types/product";

import {
  createProductSchema,
  type CreateProductFormData,
} from "@/app/(dashboard)/products/create/schema";

type ProductFormProps = {
  mode: "create" | "edit";
  initialValues?: Partial<CreateProductFormData>;
  isSubmitting: boolean;
  onSubmit: (data: CreateProductRequest) => Promise<void>;
};

export function ProductForm({
  mode,
  initialValues,
  isSubmitting,
  onSubmit,
}: ProductFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      status: "DRAFT",
      featured: false,
      gallery: [],
      categoryIds: [],
      tagIds: [],
      seoTitle: "",
      seoDescription: "",
      seoOgImageId: null,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (!initialValues) return;

    reset({
      name: initialValues.name ?? "",
      slug: initialValues.slug ?? "",
      shortDescription: initialValues.shortDescription ?? "",
      description: initialValues.description ?? "",
      status: initialValues.status ?? "DRAFT",
      featured: initialValues.featured ?? false,
      gallery: initialValues.gallery ?? [],
      categoryIds: initialValues.categoryIds ?? [],
      tagIds: initialValues.tagIds ?? [],
      seoTitle: initialValues.seoTitle ?? "",
      seoDescription: initialValues.seoDescription ?? "",
      seoOgImageId: initialValues.seoOgImageId ?? null,
    });
  }, [initialValues, reset]);

  async function submit(data: CreateProductFormData) {
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
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription || null,
      description: {
        body: data.description,
      },
      status: data.status,
      featured: data.featured,
      gallery: data.gallery,
      categoryIds: data.categoryIds,
      tagIds: data.tagIds,
      seo: Object.keys(seo).length > 0 ? seo : undefined,
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

        <TextField
          label="Slug"
          error={errors.slug?.message}
          {...register("slug")}
        />

        <TextArea
          label="Short Description"
          error={errors.shortDescription?.message}
          {...register("shortDescription")}
        />

        <TextArea
          label="Description"
          error={errors.description?.message}
          {...register("description")}
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
              label: "Active",
              value: "ACTIVE",
            },
            {
              label: "Archived",
              value: "ARCHIVED",
            },
          ]}
          {...register("status")}
        />

        <CheckboxField label="Featured Product" {...register("featured")} />

        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>

          <Controller
            control={control}
            name="categoryIds"
            render={({ field }) => (
              <CategoryPicker value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>

          <Controller
            control={control}
            name="tagIds"
            render={({ field }) => (
              <TagPicker value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gallery</label>

          <Controller
            control={control}
            name="gallery"
            render={({ field }) => (
              <MediaPicker
                multiple
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
                ? "Create Product"
                : "Save Changes"}
          </Button>

          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => router.push(routes.products)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
