/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var tinymce: any;

declare var echarts: any;

// DataTables type definitions
declare namespace DataTables {
  interface Settings {}
  interface Api {
    destroy(): void;
    draw(): Api;
  }
  interface ColumnSettings {
    title?: string;
    data?: string | number | null;
    name?: string;
    defaultContent?: string;
    width?: string;
    visible?: boolean;
    searchable?: boolean;
    orderable?: boolean;
    className?: string;
    render?: any;
  }
}
