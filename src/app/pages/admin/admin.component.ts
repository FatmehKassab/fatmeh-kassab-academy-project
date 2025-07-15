import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import type { ColDef, Theme } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, PaginationModule, themeQuartz } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule,PaginationModule]);
interface IRow {
  id: number;
  name: string;
  description: string;
  price: number;
 status: string;
 actions?:any;
}
@Component({
   standalone: true,
  selector: 'app-admin',
  imports: [AgGridAngular,CommonModule, ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
    constructor(){
    }
rowData: IRow[] = [
  { id: 1, name: "T-Shirt", description: "Cotton round neck", price: 15.99, status: "Available" },
  { id: 2, name: "Jeans", description: "Slim fit blue denim", price: 49.99, status: "Available" },
  { id: 3, name: "Jacket", description: "Waterproof windbreaker", price: 79.99, status: "Out of Stock" },
  { id: 4, name: "Sweater", description: "Wool knitted sweater", price: 39.99, status: "Available" },
  { id: 5, name: "Shorts", description: "Casual cotton shorts", price: 25.5, status: "Out of Stock" },
  { id: 6, name: "Dress", description: "Floral summer dress", price: 59.0, status: "Available" },
  { id: 7, name: "Skirt", description: "Pleated midi skirt", price: 29.99, status: "Available" },
  { id: 8, name: "Blouse", description: "Chiffon v-neck blouse", price: 34.5, status: "Out of Stock" },
  { id: 9, name: "Tank Top", description: "Ribbed cotton tank", price: 12.99, status: "Available" },
  { id: 10, name: "Leggings", description: "High-waist workout leggings", price: 27.99, status: "Available" },
  { id: 11, name: "Coat", description: "Double-breasted trench coat", price: 89.99, status: "Out of Stock" },
  { id: 12, name: "Polo Shirt", description: "Classic cotton polo", price: 22.5, status: "Available" },
  { id: 13, name: "Cardigan", description: "Open front knit cardigan", price: 44.0, status: "Available" },
  { id: 14, name: "Cargo Pants", description: "Utility-style cargo", price: 39.99, status: "Out of Stock" },
  { id: 15, name: "Hoodie", description: "Fleece lined hoodie", price: 49.0, status: "Available" },
  { id: 16, name: "Tracksuit", description: "Two-piece tracksuit", price: 69.99, status: "Available" },
  { id: 17, name: "Cap", description: "Adjustable baseball cap", price: 15.0, status: "Out of Stock" },
  { id: 18, name: "Scarf", description: "Silk printed scarf", price: 18.75, status: "Available" },
  { id: 19, name: "Belt", description: "Leather buckle belt", price: 24.99, status: "Available" },
  { id: 20, name: "Socks", description: "Pack of 3 ankle socks", price: 9.99, status: "Available" },
  { id: 21, name: "Shoes", description: "Canvas lace-up sneakers", price: 54.5, status: "Out of Stock" },
  { id: 22, name: "Sandals", description: "Flat leather sandals", price: 35.0, status: "Available" },
  { id: 23, name: "Boots", description: "Ankle suede boots", price: 84.99, status: "Available" },
  { id: 24, name: "Gloves", description: "Winter knit gloves", price: 11.5, status: "Out of Stock" },
  { id: 25, name: "Sunglasses", description: "UV400 polarized sunglasses", price: 29.99, status: "Available" },
  { id: 26, name: "Watch", description: "Analog leather strap watch", price: 99.99, status: "Out of Stock" },
  { id: 27, name: "Backpack", description: "Nylon waterproof backpack", price: 65.0, status: "Available" },
  { id: 28, name: "Hat", description: "Wide brim summer hat", price: 19.99, status: "Available" },
  { id: 29, name: "Bracelet", description: "Gold-plated chain bracelet", price: 22.0, status: "Available" },
  { id: 30, name: "Necklace", description: "Sterling silver pendant", price: 45.5, status: "Out of Stock" },
];



  colDefs: ColDef<IRow>[] = [
    { field: "id" },
    { field: "name"},
    { field: "description", editable: true },
    { field: "price", filter: true, valueFormatter: params => '$' + params.value },
    { field: "status",

     cellRenderer: (params: any) => {
     const isAvailable = params.value === "Available";
     const color = isAvailable ? "green" : "red";
    return `<span style="padding: 4px 8px; border-radius: 16px; color: white; background-color: ${color}; font-size: 12px;">
      ${params.value}
    </span>`;
  }
},
 {
      field: 'actions',
      cellRenderer: (params: any) => {
        return `<button>🗑️</button>`;
      },
      onCellClicked: (params) => this.onRemoveClick(params),

    }
  ];

  theme: Theme | "legacy" = myTheme;

onRemoveClick(params: any): void {
    const rowData = params.node.data;
    params.api.applyTransaction({ remove: [rowData] });
  }

  
}
const myTheme = themeQuartz.withParams({
  backgroundColor: "rgb(249, 245, 227)",
  foregroundColor: "rgb(126, 46, 132)",
  headerTextColor: "rgb(204, 245, 172)",
  headerBackgroundColor: "rgb(209, 64, 129)",
  oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  headerColumnResizeHandleColor: "rgb(126, 46, 132)",
  fontFamily: 'serif',
  headerFontFamily: 'Brush Script MT',
  cellFontFamily: 'monospace',
});