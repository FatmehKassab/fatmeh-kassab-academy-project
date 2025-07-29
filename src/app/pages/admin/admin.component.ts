import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import type { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, PaginationModule } from "ag-grid-community";
import { ProductService } from '../../shared/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { SidemenuComponent } from "../../shared/components/sidemenu/sidemenu.component";
import { ButtonComponent } from "../../shared/components/button/button.component";

ModuleRegistry.registerModules([AllCommunityModule, PaginationModule]);

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [AgGridAngular, CommonModule, ConfirmDialogModule, SidemenuComponent, ButtonComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class AdminComponent {
  private gridApi!: GridApi;
  rowData: any[] = [];
  loading = false;
  ref: DynamicDialogRef | undefined;


    gridOptions: GridOptions = {
  getRowId: params => params.data.id,

};
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID',width:20 },
    { 
      field: 'title', 
      headerName: 'Product Name',
      cellRenderer: (params: any) => `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${params.data.image}" alt="${params.data.title}" style="width: 40px; height: 40px; object-fit: contain;" />
          <span>${params.data.title}</span>
        </div>
      `,
      autoHeight: true
    },
    { field: 'category', headerName: 'Category',filter: true, width:150 },
    { field: 'price', headerName: 'Price', valueFormatter: params => `$${params.value}` ,width:50},
    { 
      field: 'actions', 
      headerName: 'Actions',
      width:150,
      cellRenderer: (params: any) => `
       <div style="display: flex; gap: 10px;  align-items: center;">
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

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

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
}