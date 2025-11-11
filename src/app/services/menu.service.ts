import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuWithSubmenus } from '../models/Menu';
import { MainMenuAccess, MainMenuAccessBulk } from '../models/MainMenuAccess';
import { SubMenuAccess, SubMenuAccessBulk } from '../models/SubMenuAccess';
import { DepartmentAccess } from '../models/DepartmentAccess';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  res = [];
  link = localStorage.getItem('serverLink');
  endpoint: string = 'http://127.0.0.1/viyon_backend';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  public getRequest(url, text = false){
    let opt: any = {
      headers: new HttpHeaders({'Content-Type': 'application/json',  accept: 'text/plain'}),
      responseType: 'text'
    };
    if(!text) opt = {}
      return this.http.get(url, opt)
      .toPromise().then((data: any) => {return data; });
  }

  public menuGetDataAPI(id:string){
    let url = `${this.endpoint}/Menu/getMenuAPI/`+ id;
    return this.getRequest(url);
  }

  // ==================== MAIN MENU ACCESS API ====================

  /**
   * Get all main menu access
   * @param f_deptid Optional filter by department ID
   */
  getAllMainMenuAccess(f_deptid?: number): Observable<any> {
    const url = f_deptid 
      ? `${this.endpoint}/menu/akses/mainmenu?f_deptid=${f_deptid}`
      : `${this.endpoint}/menu/akses/mainmenu`;
    return this.http.get<any>(url);
  }

  /**
   * Get main menu access by ID
   * @param id ID akses main menu
   */
  getMainMenuAccessById(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/menu/akses/mainmenu/id/${id}`);
  }

  /**
   * Create new main menu access
   * @param data Main menu access data
   */
  createMainMenuAccess(data: MainMenuAccess): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/menu/akses/mainmenu`, 
      JSON.stringify(data), 
      this.httpHeader
    );
  }

  /**
   * Update main menu access
   * @param id ID akses main menu
   * @param data Updated permissions (r, c, u, d)
   */
  updateMainMenuAccess(id: number, data: Partial<MainMenuAccess>): Observable<any> {
    return this.http.put<any>(
      `${this.endpoint}/menu/akses/mainmenu/id/${id}`, 
      JSON.stringify(data), 
      this.httpHeader
    );
  }

  /**
   * Delete main menu access (will also delete related submenu access)
   * @param id ID akses main menu
   */
  deleteMainMenuAccess(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/menu/akses/mainmenu/id/${id}`);
  }

  /**
   * Bulk update main menu access for department
   * @param data Bulk update data with f_deptid and menu_access array
   */
  bulkUpdateMainMenuAccess(data: MainMenuAccessBulk): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/menu/akses/mainmenu/bulk`, 
      JSON.stringify(data), 
      this.httpHeader
    );
  }

  // ==================== SUB MENU ACCESS API ====================

  /**
   * Get all sub menu access
   * @param f_deptid Optional filter by department ID
   * @param id_menu Optional filter by main menu ID
   */
  getAllSubMenuAccess(f_deptid?: number, id_menu?: number): Observable<any> {
    let url = `${this.endpoint}/menu/akses/submenu`;
    const params = [];
    
    if (f_deptid) params.push(`f_deptid=${f_deptid}`);
    if (id_menu) params.push(`id_menu=${id_menu}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<any>(url);
  }

  /**
   * Get sub menu access by ID
   * @param id ID akses sub menu
   */
  getSubMenuAccessById(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/menu/akses/submenu/id/${id}`);
  }

  /**
   * Create new sub menu access
   * @param data Sub menu access data
   */
  createSubMenuAccess(data: SubMenuAccess): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/menu/akses/submenu`, 
      JSON.stringify(data), 
      this.httpHeader
    );
  }

  /**
   * Update sub menu access
   * @param id ID akses sub menu
   * @param data Updated permissions (r, c, u, d)
   */
  updateSubMenuAccess(id: number, data: Partial<SubMenuAccess>): Observable<any> {
    return this.http.put<any>(
      `${this.endpoint}/menu/akses/submenu/id/${id}`, 
      JSON.stringify(data), 
      this.httpHeader
    );
  }

  /**
   * Delete sub menu access
   * @param id ID akses sub menu
   */
  deleteSubMenuAccess(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/menu/akses/submenu/id/${id}`);
  }

  /**
   * Bulk update sub menu access for department
   * @param data Bulk update data with f_deptid and submenu_access array
   */
  bulkUpdateSubMenuAccess(data: SubMenuAccessBulk): Observable<any> {
    return this.http.post<any>(
      `${this.endpoint}/menu/akses/submenu/bulk`, 
      JSON.stringify(data), 
      this.httpHeader
    );
  }

  // ==================== HELPER ENDPOINTS ====================

  /**
   * Get all available menus with their submenus
   */
  getAllMenus(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/menu/akses/menus`);
  }

  /**
   * Get complete access configuration for specific department
   * @param f_deptid Department ID
   */
  getDepartmentAccess(f_deptid: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/menu/akses/department/${f_deptid}`);
  }
}
