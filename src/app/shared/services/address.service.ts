import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private addressData: any = null;

setAddress(address: any) {
  this.addressData = address;
  localStorage.setItem('userAddress', JSON.stringify(address));
}

getAddress(): any {
  if (this.addressData) return this.addressData;

  const local = localStorage.getItem('userAddress');
  if (local) {
    this.addressData = JSON.parse(local);
    return this.addressData;
  }

  return null;
}

}
