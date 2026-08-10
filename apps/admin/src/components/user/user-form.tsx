"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { CreateUserRequest, Role, UpdateUserRequest } from "@/types/user";

import {
  userFormSchema,
  type UserFormData,
} from "@/app/(dashboard)/users/create/schema";

type UserFormProps = {
  mode: "create" | "edit";

  roles: Role[];

  initialValues?: Partial<UserFormData>;

  isSubmitting: boolean;

  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => Promise<void>;
};

export function UserForm({
  mode,
  roles,
  initialValues,
  isSubmitting,
  onSubmit,
}: UserFormProps) {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: null,
      isActive: true,
      ...initialValues,
    },
  });

  async function submit(data: UserFormData) {
    setFormError(null);

    if (mode === "create" && (!data.password || data.password.length < 8)) {
      setFormError("Password must contain at least 8 characters.");

      return;
    }

    try {
      const payload: CreateUserRequest | UpdateUserRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        roleId: data.roleId,
        isActive: data.isActive,
      };

      if (data.password) {
        payload.password = data.password;
      }

      await onSubmit(payload);
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

  return (
    <Card>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        {formError && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        <TextField
          label="First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <TextField
          label="Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <TextField
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <TextField
          label={mode === "create" ? "Password" : "New Password"}
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />

        {mode === "edit" && (
          <p className="text-sm text-gray-500">
            Leave password empty to keep the current password.
          </p>
        )}

        <SelectField
          label="Role"
          error={errors.roleId?.message}
          options={[
            {
              label: "No role",
              value: "",
            },
            ...roles.map((role) => ({
              label: role.name,
              value: String(role.id),
            })),
          ]}
          {...register("roleId", {
            setValueAs: (value) =>
              value === "" || value == null ? null : Number(value),
          })}
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isActive")} />

          <span className="text-sm">Active</span>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create User"
              : "Save Changes"}
        </Button>
      </form>
    </Card>
  );
}
