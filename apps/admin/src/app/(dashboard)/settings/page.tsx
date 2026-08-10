import { PageHeader } from "@/components/layout/page-header";
import { GeneralSettingsForm } from "@/components/settings/general-settings-form";
import { PageContainer } from "@/components/ui/page-container";
import { SeoSettingsForm } from "@/components/settings/seo-settings-form";
import { ContactSettingsForm } from "@/components/settings/contact-settings-form";
import { SocialSettingsForm } from "@/components/settings/social-settings-form";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage global website settings."
      />

      <div className="space-y-6">
        <GeneralSettingsForm />
        <SeoSettingsForm />
        <ContactSettingsForm />
        <SocialSettingsForm />
      </div>
    </PageContainer>
  );
}
