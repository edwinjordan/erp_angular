import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { MenuService } from '../../services/menu.service';
import { MasterService } from '../../services/master.service';
import { MenuWithSubmenus } from '../../models/Menu';
import { MainMenuAccess, MainMenuAccessBulk } from '../../models/MainMenuAccess';
import { SubMenuAccess, SubMenuAccessBulk } from '../../models/SubMenuAccess';
import { Departement } from '../../models/Departement';

@Component({
  selector: 'ngx-menu-access',
  templateUrl: './menu-access.component.html',
  styleUrls: ['./menu-access.component.scss']
})
export class MenuAccessComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  // Data
  menus: MenuWithSubmenus[] = [];
  departments: Departement[] = [];
  selectedDepartment: number = null;
  
  // Access data
  mainMenuAccessList: MainMenuAccess[] = [];
  subMenuAccessList: SubMenuAccess[] = [];
  
  // UI State
  loading: boolean = false;
  showForm: boolean = false;
  editMode: boolean = false;

  constructor(
    private menuService: MenuService,
    private masterService: MasterService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    console.log('MenuAccessComponent initialized');
    this.loadDepartments();
    this.loadMenus();
    this.initDataTable();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(undefined);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /**
   * Initialize DataTable
   */
  initDataTable(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: []
    };
  }

  /**
   * Load all available menus
   */
  loadMenus(): void {
    console.log('Loading menus...');
    this.menuService.getAllMenus().subscribe(
      resp => {
        if (resp.status) {
          this.menus = resp.data || [];
          console.log('Menus loaded:', this.menus.length, 'menus', this.menus);
        } else {
          this.showToast('warning', 'Perhatian', resp.message || 'Gagal memuat menu');
        }
      },
      error => {
        console.error('Error loading menus:', error);
        this.showToast('danger', 'Error', 'Gagal memuat data menu');
      }
    );
  }

  /**
   * Load all departments
   */
  loadDepartments(): void {
    this.masterService.departmentGetDataAPI({}).subscribe(
      resp => {
        console.log('Department API Response:', resp);
        if (resp && resp.data) {
          this.departments = resp.data;
          console.log('Departments loaded:', this.departments);
        } else if (Array.isArray(resp)) {
          // Fallback jika response langsung array
          this.departments = resp;
          console.log('Departments loaded (array):', this.departments);
        } else {
          console.error('Unexpected department response format:', resp);
          this.showToast('warning', 'Perhatian', 'Format data department tidak sesuai');
        }
      },
      error => {
        console.error('Error loading departments:', error);
        this.showToast('danger', 'Error', 'Gagal memuat data department');
      }
    );
  }

  /**
   * Load access for selected department
   */
  loadDepartmentAccess(): void {
    if (!this.selectedDepartment) {
      this.showToast('warning', 'Perhatian', 'Pilih department terlebih dahulu');
      return;
    }

    console.log('Loading access for department:', this.selectedDepartment);
    this.loading = true;
    
    this.menuService.getDepartmentAccess(this.selectedDepartment).subscribe(
      resp => {
        console.log('Department Access Response:', resp);
        if (resp.status) {
          this.mainMenuAccessList = resp.data.mainmenu_access || [];
          this.subMenuAccessList = resp.data.submenu_access || [];
          console.log('Main menu access:', this.mainMenuAccessList);
          console.log('Sub menu access:', this.subMenuAccessList);
          this.mergeAccessWithMenus();
        } else {
          console.warn('Response status false:', resp);
          this.showToast('warning', 'Perhatian', resp.message || 'Gagal memuat data akses');
        }
        this.loading = false;
      },
      error => {
        console.error('Error loading department access:', error);
        this.loading = false;
        this.showToast('danger', 'Error', 'Gagal memuat data akses');
      }
    );
  }

  /**
   * Merge access data with menu structure
   */
  mergeAccessWithMenus(): void {
    console.log('Merging access with menus...');
    console.log('Menus:', this.menus);
    console.log('Selected department:', this.selectedDepartment);
    console.log('Main menu access list:', this.mainMenuAccessList);
    console.log('Sub menu access list:', this.subMenuAccessList);
    
    this.menus.forEach((menu: any) => {
      console.log(`Processing menu:`, menu);
      
      // Find main menu access - try different property names
      const mainAccess = this.mainMenuAccessList.find((a: any) => 
        a.id_menu === menu.id_menu || 
        a.id_menu === menu.id ||
        a.menu_id === menu.id_menu ||
        a.menu_id === menu.id
      );
      
      if (mainAccess) {
        // Convert string to number for r, c, u, d
        menu['access'] = {
          ...mainAccess,
          r: parseInt(mainAccess.r as any) || 0,
          c: parseInt(mainAccess.c as any) || 0,
          u: parseInt(mainAccess.u as any) || 0,
          d: parseInt(mainAccess.d as any) || 0
        };
        console.log(`✓ Main menu "${menu.nm_menu || menu.menu_name}" has access:`, menu['access']);
      } else {
        // Set default access jika belum ada
        menu['access'] = {
          id_menu: menu.id_menu || menu.id,
          f_deptid: this.selectedDepartment,
          r: 0,
          c: 0,
          u: 0,
          d: 0
        };
        console.log(`⚠ Main menu "${menu.nm_menu || menu.menu_name}" set to default access (no data found)`);
      }

      // Find submenu access
      if (menu.submenus && menu.submenus.length > 0) {
        menu.submenus.forEach((submenu: any) => {
          const subAccess = this.subMenuAccessList.find((a: any) => 
            a.id_sub_menu === submenu.id_submenu || 
            a.id_sub_menu === submenu.id ||
            a.submenu_id === submenu.id_submenu ||
            a.submenu_id === submenu.id
          );
          
          if (subAccess) {
            // Convert string to number for r, c, u, d
            submenu['access'] = {
              ...subAccess,
              r: parseInt(subAccess.r as any) || 0,
              c: parseInt(subAccess.c as any) || 0,
              u: parseInt(subAccess.u as any) || 0,
              d: parseInt(subAccess.d as any) || 0
            };
            console.log(`  ✓ Submenu "${submenu.nm_submenu || submenu.submenu_name}" has access:`, submenu['access']);
          } else {
            // Set default access jika belum ada
            submenu['access'] = {
              id_sub_menu: submenu.id_submenu || submenu.id,
              f_deptid: this.selectedDepartment,
              r: 0,
              c: 0,
              u: 0,
              d: 0
            };
            console.log(`  ⚠ Submenu "${submenu.nm_submenu || submenu.submenu_name}" set to default access`);
          }
        });
      }
    });
    
    console.log('Menus after merge:', this.menus);
  }

  /**
   * Toggle permission
   */
  togglePermission(access: any, permission: 'r' | 'c' | 'u' | 'd'): void {
    if (!access) {
      console.error('Access object is null/undefined');
      return;
    }
    
    const oldValue = access[permission];
    access[permission] = access[permission] === 1 ? 0 : 1;
    console.log(`Toggle ${permission}: ${oldValue} → ${access[permission]}`, access);
  }

  /**
   * Toggle all permissions for a menu
   */
  toggleAllPermissions(access: any): void {
    if (!access) {
      console.error('Access object is null/undefined');
      return;
    }
    
    const allChecked = access.r === 1 && access.c === 1 && access.u === 1 && access.d === 1;
    const newValue = allChecked ? 0 : 1;
    access.r = newValue;
    access.c = newValue;
    access.u = newValue;
    access.d = newValue;
    console.log(`Toggle All: set to ${newValue}`, access);
  }

  /**
   * Save all access configurations
   */
  saveAccess(): void {
    if (!this.selectedDepartment) {
      this.showToast('warning', 'Perhatian', 'Pilih department terlebih dahulu');
      return;
    }

    this.loading = true;

    // Prepare main menu access data
    const mainMenuBulkData: MainMenuAccessBulk = {
      f_deptid: this.selectedDepartment,
      menu_access: this.menus.map(menu => ({
        id_menu: menu.id_menu,
        r: menu['access'].r,
        c: menu['access'].c,
        u: menu['access'].u,
        d: menu['access'].d
      }))
    };

    // Prepare sub menu access data
    const subMenuBulkData: SubMenuAccessBulk = {
      f_deptid: this.selectedDepartment,
      submenu_access: []
    };

    this.menus.forEach(menu => {
      menu.submenus?.forEach(submenu => {
        subMenuBulkData.submenu_access.push({
          id_sub_menu: submenu.id_submenu,
          r: submenu['access'].r,
          c: submenu['access'].c,
          u: submenu['access'].u,
          d: submenu['access'].d
        });
      });
    });

    // Save main menu access
    this.menuService.bulkUpdateMainMenuAccess(mainMenuBulkData).subscribe(
      resp => {
        if (resp.status) {
          // Save sub menu access
          this.menuService.bulkUpdateSubMenuAccess(subMenuBulkData).subscribe(
            resp2 => {
              if (resp2.status) {
                this.showToast('success', 'Sukses', 'Hak akses berhasil disimpan');
                this.loadDepartmentAccess();
              }
              this.loading = false;
            },
            error => {
              this.loading = false;
              this.showToast('danger', 'Error', 'Gagal menyimpan akses sub menu');
            }
          );
        } else {
          this.loading = false;
          this.showToast('danger', 'Error', resp.message || 'Gagal menyimpan akses main menu');
        }
      },
      error => {
        this.loading = false;
        this.showToast('danger', 'Error', 'Gagal menyimpan akses main menu');
      }
    );
  }

  /**
   * Reset form
   */
  resetForm(): void {
    console.log('Resetting form...');
    this.selectedDepartment = null;
    this.mainMenuAccessList = [];
    this.subMenuAccessList = [];
    
    // Clear access data from menus
    this.menus.forEach(menu => {
      delete menu['access'];
      if (menu.submenus) {
        menu.submenus.forEach(submenu => {
          delete submenu['access'];
        });
      }
    });
    
    console.log('Form reset complete');
    this.showToast('info', 'Info', 'Form telah direset');
  }

  /**
   * Show toast notification
   */
  showToast(type: string, title: string, message: string): void {
    this.toastrService.show(message, title, { status: type });
  }

  /**
   * Check if department has any access
   */
  hasAccess(): boolean {
    return this.mainMenuAccessList.length > 0 || this.subMenuAccessList.length > 0;
  }
}
