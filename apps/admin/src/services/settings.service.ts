import { apiClient } from "@/lib/api/api-client";

import type {
  SettingsGroup,
  SettingsMap,
  SettingResponse,
} from "@/types/settings";

export class SettingsService {
  static getGroup<K extends SettingsGroup>(group: K) {
    return apiClient.get<{
      success: boolean;
      message: string;
      data: SettingResponse<SettingsMap[K]> | null;
    }>(`/settings/${group}`);
  }

  static updateGroup<K extends SettingsGroup>(group: K, value: SettingsMap[K]) {
    return apiClient.put<{
      success: boolean;
      message: string;
      data: SettingResponse<SettingsMap[K]>;
    }>(`/settings/${group}`, {
      value,
    });
  }
}
