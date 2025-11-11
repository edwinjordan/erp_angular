export class Menu {
  id_menu: number;
  menu_name: string;
  menu_icon: string;
  menu_url: string;
  menu_order: number;
  created_at?: string;
  updated_at?: string;
}

export class SubMenu {
  id_submenu: number;
  id_menu: number;
  submenu_name: string;
  submenu_url: string;
  submenu_order: number;
  created_at?: string;
  updated_at?: string;
}

export class MenuWithSubmenus extends Menu {
  submenus: SubMenu[];
}
