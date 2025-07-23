import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import type { CellClickedEvent, ColDef, GridApi, GridReadyEvent, Theme } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, PaginationModule, themeQuartz } from "ag-grid-community";
import { ProductService } from '../../shared/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductFormComponent } from '../product-form/product-form.component';
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
  imports: [AgGridAngular,CommonModule,   ConfirmDialogModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
    providers: [ConfirmationService, MessageService, DialogService]
})
export class AdminComponent {
    constructor(private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService){
    }
  private gridApi!: GridApi;
  rowData: any[] = [];
  loading = false;
  ref: DynamicDialogRef | undefined;
// rowData: IRow[] = [
//   { id: 1, name: "T-Shirt", description: "Cotton round neck", price: 15.99, status: "Available" },
//   { id: 2, name: "Jeans", description: "Slim fit blue denim", price: 49.99, status: "Available" },
//   { id: 3, name: "Jacket", description: "Waterproof windbreaker", price: 79.99, status: "Out of Stock" },
//   { id: 4, name: "Sweater", description: "Wool knitted sweater", price: 39.99, status: "Available" },
//   { id: 5, name: "Shorts", description: "Casual cotton shorts", price: 25.5, status: "Out of Stock" },
//   { id: 6, name: "Dress", description: "Floral summer dress", price: 59.0, status: "Available" },
//   { id: 7, name: "Skirt", description: "Pleated midi skirt", price: 29.99, status: "Available" },
//   { id: 8, name: "Blouse", description: "Chiffon v-neck blouse", price: 34.5, status: "Out of Stock" },
//   { id: 9, name: "Tank Top", description: "Ribbed cotton tank", price: 12.99, status: "Available" },
//   { id: 10, name: "Leggings", description: "High-waist workout leggings", price: 27.99, status: "Available" },
//   { id: 11, name: "Coat", description: "Double-breasted trench coat", price: 89.99, status: "Out of Stock" },
//   { id: 12, name: "Polo Shirt", description: "Classic cotton polo", price: 22.5, status: "Available" },
//   { id: 13, name: "Cardigan", description: "Open front knit cardigan", price: 44.0, status: "Available" },
//   { id: 14, name: "Cargo Pants", description: "Utility-style cargo", price: 39.99, status: "Out of Stock" },
//   { id: 15, name: "Hoodie", description: "Fleece lined hoodie", price: 49.0, status: "Available" },
//   { id: 16, name: "Tracksuit", description: "Two-piece tracksuit", price: 69.99, status: "Available" },
//   { id: 17, name: "Cap", description: "Adjustable baseball cap", price: 15.0, status: "Out of Stock" },
//   { id: 18, name: "Scarf", description: "Silk printed scarf", price: 18.75, status: "Available" },
//   { id: 19, name: "Belt", description: "Leather buckle belt", price: 24.99, status: "Available" },
//   { id: 20, name: "Socks", description: "Pack of 3 ankle socks", price: 9.99, status: "Available" },
//   { id: 21, name: "Shoes", description: "Canvas lace-up sneakers", price: 54.5, status: "Out of Stock" },
//   { id: 22, name: "Sandals", description: "Flat leather sandals", price: 35.0, status: "Available" },
//   { id: 23, name: "Boots", description: "Ankle suede boots", price: 84.99, status: "Available" },
//   { id: 24, name: "Gloves", description: "Winter knit gloves", price: 11.5, status: "Out of Stock" },
//   { id: 25, name: "Sunglasses", description: "UV400 polarized sunglasses", price: 29.99, status: "Available" },
//   { id: 26, name: "Watch", description: "Analog leather strap watch", price: 99.99, status: "Out of Stock" },
//   { id: 27, name: "Backpack", description: "Nylon waterproof backpack", price: 65.0, status: "Available" },
//   { id: 28, name: "Hat", description: "Wide brim summer hat", price: 19.99, status: "Available" },
//   { id: 29, name: "Bracelet", description: "Gold-plated chain bracelet", price: 22.0, status: "Available" },
//   { id: 30, name: "Necklace", description: "Sterling silver pendant", price: 45.5, status: "Out of Stock" },
// ];



  colDefs: ColDef[] = [
//     { field: "id" },
//     { field: "name"},
//     { field: "description", editable: true },
//     { field: "price", filter: true, valueFormatter: params => '$' + params.value },
//     { field: "status",

//      cellRenderer: (params: any) => {
//      const isAvailable = params.value === "Available";
//      const color = isAvailable ? "green" : "red";
//     return `<span style="padding: 4px 8px; border-radius: 16px; color: white; background-color: ${color}; font-size: 12px;">
//       ${params.value}
//     </span>`;
//   }
// },
//  {
//       field: 'actions',
//       cellRenderer: (params: any) => {
//         return `<button>🗑️</button>`;
//       },
//       onCellClicked: (params) => this.onRemoveClick(params),

//     }
  { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 120, valueFormatter: params => `$${params.value}` },
    { field: 'inStock', headerName: 'In Stock', width: 120, editable: true },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 200,
      cellRenderer: (params: any) => `
        <button class="p-button p-button-sm p-button-rounded p-button-text p-button-primary mr-2" data-action="edit">
         edit
        </button>
        <button class="p-button p-button-sm p-button-rounded p-button-text p-button-danger" data-action="delete">
       delete
        </button>
      `,
      onCellClicked: (event: CellClickedEvent) => this.onActionClick(event)
    }
  ];

  theme: Theme | "legacy" = myTheme;

onRemoveClick(params: any): void {
    const rowData = params.node.data;
    params.api.applyTransaction({ remove: [rowData] });
  }
 ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.rowData = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products'
        });
        this.loading = false;
      }
    });
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onCellValueChanged(event: any): void {
    if (event.colDef.field === 'inStock') {
      const product = event.data;
      this.productService.updateProduct(product.id, { inStock: product.inStock })
        .subscribe({
          next: () => this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Stock updated'
          }),
          error: (err) => {
            console.error('Error updating stock:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update stock'
            });
          }
        });
    }
  }

  onActionClick(event: CellClickedEvent): void {
    if (event.event?.target instanceof HTMLElement) {
      const action = event.event.target.getAttribute('data-action') || 
                    (event.event.target.parentElement as HTMLElement)?.getAttribute('data-action');
      const product = event.data;

      if (action === 'edit') {
        this.openEditDialog(product);
      } else if (action === 'delete') {
        this.openDeleteDialog(product.id);
      }
    }
  }

  openAddDialog(): void {
       console.log("component",ProductFormComponent)
    this.ref = this.dialogService.open(ProductFormComponent, 
   
      {
      header: 'Add New Product',
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto', 'display': 'block' },
      baseZIndex: 10000,
      data: { mode: 'add' },
       focusTrap: true,  // Add this
  autoZIndex: true  // Add this
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.productService.addProduct(result).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product added successfully'
            });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error adding product:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add product'
            });
          }
        });
      }
    });
  }

  openEditDialog(product: any): void {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Edit Product',
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto', 'display': 'block' },
      baseZIndex: 10000,
      data: { mode: 'edit', product }
      ,
       focusTrap: true,  // Add this
  autoZIndex: true  // Add this
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.productService.updateProduct(product.id, result).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product updated successfully'
            });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error updating product:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update product'
            });
          }
        });
      }
    });
  }

  openDeleteDialog(productId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product deleted successfully'
            });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete product'
            });
          }
        });
      }
    });
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