import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InsurancePlan, InsuranceSearch } from './interface';
import { UserService } from './user';

@Injectable()
export class InsuranceService {
  constructor(public userService: UserService, public http: HttpClient) {}
  async getInsurancePlans() {
    const user = await this.userService.getUser();
    return await this.http
      .get<InsurancePlan[]>(`https://herefyp.herokuapp.com/api/insurance?patientId=${user.id}`)
      .toPromise();
  }

  async getInsurancePlan(id: number) {
    return await this.http
      .get<InsurancePlan>(`https://herefyp.herokuapp.com/api/insurance/${id}`)
      .toPromise();
  }

  async searchInsurancePlans(search: InsuranceSearch) {
    const user = await this.userService.getUser();

    return await this.http
      .post<InsurancePlan[]>('https://herefyp.herokuapp.com/api/insurance/search', {
        patientId: user.id,
        search: {
          ...search
        }
      })
      .toPromise();
  }
}
