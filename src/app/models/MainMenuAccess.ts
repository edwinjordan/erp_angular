export class MainMenuAccess {
  id_akses_mainmenu?: number;
  id_menu: number;
  f_deptid: number;
  r: number; // Read permission (0/1)
  c: number; // Create permission (0/1)
  u: number; // Update permission (0/1)
  d: number; // Delete permission (0/1)
  menu_name?: string;
  menu_icon?: string;
  menu_url?: string;
  created_at?: string;
  updated_at?: string;
}

export class MainMenuAccessBulk {
  f_deptid: number;
  menu_access: {
    id_menu: number;
    r: number;
    c: number;
    u: number;
    d: number;
  }[];
}
