import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InsurancePlan, InsuranceSearch } from './interface';

@Injectable()
export class InsuranceService {
  constructor(public http: HttpClient) {}
  async getInsurancePlans() {
    return await this.http
      .get<InsurancePlan[]>('https://herefyp.herokuapp.com/api/insurance')
      .toPromise();
  }

  async searchInsurancePlans(search: InsuranceSearch) {
    return await this.http
      .post<InsurancePlan[]>('https://herefyp.herokuapp.com/api/insurance/search', {
        search: {
          ...search
        }
      })
      .toPromise();
  }
}