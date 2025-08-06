import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import type { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, Theme } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, PaginationModule, themeQuartz } from "ag-grid-community";
import { ProductService } from '../../shared/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { SidemenuComponent } from "../../shared/components/sidemenu/sidemenu.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { ICONS } from '../../shared/utils/icons';

ModuleRegistry.registerModules([AllCommunityModule, PaginationModule]);

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [AgGridAngular, CommonModule, ConfirmDialogModule, SidemenuComponent, ButtonComponent,AgCharts],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class AdminComponent {
  ICONS=ICONS;
  currentView: string = 'products'; 
  private gridApi!: GridApi;
  rowData: any[] = [];
  loading = false;
  ref: DynamicDialogRef | undefined;

  onMenuItemClick(menuItem:any): void {
    this.currentView = menuItem.toLowerCase();
  }
    gridOptions: GridOptions = {
  getRowId: params => params.data.id,

};
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID',width:20 },
    { 
      field: 'title', 
      headerName: 'Product Name',
      cellRenderer: (params: any) => `
        <div style="display: flex; align-items: center; gap: 10px; ">
          <img src="${params.data.image}" alt="${params.data.title}" style="width: 40px; height: 40px; object-fit: contain;" />
          <span>${params.data.title}</span>
        </div>
      `,
      autoHeight: true
    },
    { field: 'category', headerName: 'Category',filter: true, width:100 },
   
    { field: 'price', headerName: 'Price', valueFormatter: params => `$${params.value}` ,width:80,
    cellRenderer: (params: any) => {
     const isExpensive = params.value > 100;
     const color = isExpensive ? "var(--secondary)" : "green";
    return `<span style="padding: 4px 12px; border-radius: 16px; color: ${color}; border: 2px solid ${color}; font-size: 12px; font-weight:bold;">
      ${params.value}
    </span>`;
  }},
    { field: 'description', headerName: 'Description', tooltipField: "description",editable: true,width:150 },
    
    { 
      field: 'actions', 
      headerName: 'Actions',
      width:70,
      cellRenderer: (params: any) => `
       <div style="display: flex; gap: 10px;  align-items: center;justify-content:end; padding-top:20px; padding-right:20px;">
      <img src="icons/edit.svg" data-action="edit" alt="Edit" style="width: 20px; height: 20px; cursor: pointer;" />
      <img src="/icons/bin.svg" data-action="delete" alt="Delete" style="width: 20px; height: 20px; cursor: pointer;" />
    </div>
      `,
      onCellClicked: (event: CellClickedEvent) => this.onActionClick(event)
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  public chartOptions: AgChartOptions;
  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    
  ) { this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }]
    };}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.rowData = [...products];
        this.loading = false;
        
        if (this.gridApi) {
          this.gridApi.setGridOption('rowData', this.rowData);
        }
        this.cdr.detectChanges();
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
    this.gridApi.sizeColumnsToFit();
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
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Add New Product',
      width: '50%',
      contentStyle: { 'max-height': '500px', 'overflow': 'auto', 'display': 'block' },
      baseZIndex: 10000,
      data: { mode: 'add' },
      focusTrap: true,
      autoZIndex: true
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.productService.addProduct(result).subscribe({
          next: (addedProduct) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product added successfully'
            });
            this.gridApi.applyTransaction({ add: [addedProduct] });
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
      data: { mode: 'edit', product },
      focusTrap: true,
      autoZIndex: true
    });

    this.ref.onClose.subscribe((result) => {
      if (result) {
        this.productService.updateProduct(product.id, result).subscribe({
          next: (updatedProduct) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product updated successfully'
            });
            this.gridApi.applyTransaction({ update: [updatedProduct] });
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
        const deletedItem = this.rowData.find(item => item.id === productId);
        if (deletedItem) {
          this.productService.deleteProduct(productId).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product deleted successfully'
              });
              this.gridApi.applyTransaction({ remove: [deletedItem] });
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
      }
    });
  }


   theme: Theme | "legacy" = myTheme;
}

const myTheme = themeQuartz.withParams({
  backgroundColor: "var(--white)",
  foregroundColor: "var(--primary)",
  headerTextColor: "var(--white)",
  headerBackgroundColor: "var(--primary)",
  oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  cellFontFamily: 'monospace',
  rowVerticalPaddingScale:2,
  
  
});