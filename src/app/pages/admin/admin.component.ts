import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import type { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, PaginationModule } from "ag-grid-community";
import { ProductService } from '../../shared/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductFormComponent } from '../product-form/product-form.component';

ModuleRegistry.registerModules([AllCommunityModule, PaginationModule]);

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [AgGridAngular, CommonModule, ConfirmDialogModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class AdminComponent {
  private gridApi!: GridApi;
  rowData: any[] = [];
  loading = false;
  ref: DynamicDialogRef | undefined;

  colDefs: ColDef[] = [
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
    this.productService.getProducts().subscribe({
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

  onCellValueChanged(event: any): void {
    if (event.colDef.field === 'inStock') {
      const product = event.data;
      this.productService.updateProduct(product.id, { inStock: product.inStock })
        .subscribe({
          next: (updatedProduct) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Stock updated'
            });
            this.gridApi.applyTransaction({ update: [updatedProduct] });
          },
          error: (err) => {
            console.error('Error updating stock:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update stock'
            });
            // Revert the change if the update fails
            this.gridApi.applyTransaction({ update: [event.oldValue] });
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