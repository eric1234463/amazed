import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user";
import { Doctor } from "./interface";

@Injectable()
export class DoctorService {
    constructor(public http: HttpClient, public userService: UserService) {}

    async getDoctorLocation(lat, lng) {
        return await this.http
            .get<Doctor[]>(
                `https://herefyp.herokuapp.com/api/doctor/location?lat=${lat}&lng=${lng}`
            )
            .toPromise();
    }
    async getDoctor(id: string) {
        return await this.http
            .get<Doctor>(`https://herefyp.herokuapp.com/api/doctor/${id}`)
            .toPromise();
    }
}
