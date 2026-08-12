"use client";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { PageHeader } from "@/components/layout/page-header";
import { ContactSettingsForm } from "@/components/settings/contact-settings-form";
import { GeneralSettingsForm } from "@/components/settings/general-settings-form";
import { SeoSettingsForm } from "@/components/settings/seo-settings-form";
import { SocialSettingsForm } from "@/components/settings/social-settings-form";
import { PageContainer } from "@/components/ui/page-container";

import { useCurrentUser } from "@/hooks/use-current-user";

import { hasPermission, permissions } from "@/lib/auth/permissions";

export default function SettingsPage() {
  const { data: user } = useCurrentUser();

  const canWrite = hasPermission(user?.role, permissions.settings.write);

  return (
    <PermissionGuard allowedRoles={permissions.settings.read}>
      <PageContainer>
        <PageHeader
          title="Settings"
          description="Manage global website settings."
        />

        {!canWrite && (
          <div className="mb-6 rounded-lg border bg-gray-50 p-4 text-sm text-gray-500">
            You have read-only access to settings.
          </div>
        )}

        <div className="space-y-6">
          <GeneralSettingsForm readOnly={!canWrite} />

          <SeoSettingsForm readOnly={!canWrite} />

          <ContactSettingsForm readOnly={!canWrite} />

          <SocialSettingsForm readOnly={!canWrite} />
        </div>
      </PageContainer>
    </PermissionGuard>
  );
}
