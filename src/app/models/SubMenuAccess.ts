export class SubMenuAccess {
  id_akses_submenu?: number;
  id_sub_menu: number;
  f_deptid: number;
  r: number; // Read permission (0/1)
  c: number; // Create permission (0/1)
  u: number; // Update permission (0/1)
  d: number; // Delete permission (0/1)
  submenu_name?: string;
  submenu_url?: string;
  id_menu?: number;
  created_at?: string;
  updated_at?: string;
}

export class SubMenuAccessBulk {
  f_deptid: number;
  submenu_access: {
    id_sub_menu: number;
    r: number;
    c: number;
    u: number;
    d: number;
  }[];
}
