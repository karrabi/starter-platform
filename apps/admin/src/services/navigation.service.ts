import { apiClient } from "@/lib/api/api-client";

import type {
  CreateMenuItemRequest,
  CreateMenuRequest,
  Menu,
  MenuItem,
  UpdateMenuItemRequest,
  UpdateMenuRequest,
} from "@/types/navigation";

interface MenuResponse {
  success: boolean;
  message?: string;
  data: Menu;
}

interface MenuListResponse {
  success: boolean;
  message?: string;
  data: Menu[];
}

interface MenuItemResponse {
  success: boolean;
  message?: string;
  data: MenuItem;
}

interface MenuItemListResponse {
  success: boolean;
  message?: string;
  data: MenuItem[];
}

export class NavigationService {
  static getMenus() {
    return apiClient.get<MenuListResponse>("/navigation");
  }

  static getMenu(id: number) {
    return apiClient.get<MenuResponse>(`/navigation/${id}`);
  }

  static createMenu(data: CreateMenuRequest) {
    return apiClient.post<MenuResponse>("/navigation", data);
  }

  static updateMenu(id: number, data: UpdateMenuRequest) {
    return apiClient.put<MenuResponse>(`/navigation/${id}`, data);
  }

  static deleteMenu(id: number) {
    return apiClient.delete(`/navigation/${id}`);
  }

  static getItems(menuId: number) {
    return apiClient.get<MenuItemListResponse>(`/navigation/${menuId}/items`);
  }

  static createItem(menuId: number, data: CreateMenuItemRequest) {
    return apiClient.post<MenuItemResponse>(
      `/navigation/${menuId}/items`,
      data,
    );
  }

  static updateItem(id: number, data: UpdateMenuItemRequest) {
    return apiClient.put<MenuItemResponse>(`/navigation/items/${id}`, data);
  }

  static deleteItem(id: number) {
    return apiClient.delete(`/navigation/items/${id}`);
  }
}
