import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import moment from "moment";
import { UserService } from "./user";
import { RequestOptions, Request, RequestMethod } from "@angular/http";
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
}
