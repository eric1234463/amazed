import { Injectable } from "@angular/core";
import { UserService } from "./user";
import { HttpClient } from "@angular/common/http";
import { Record } from "./interface";
import "rxjs/add/operator/map";

@Injectable()
export class RecordService {
    constructor(public userService: UserService, public http: HttpClient) {}

    async getRecords() {
        const user = await this.userService.getUser();
        return await this.http
            .get<Record[]>(
                `https://herefyp.herokuapp.com/api/record?userId=${user.id}`
            )
            .toPromise();
    }
    async getRecordByID(id) {
        return await this.http
            .get<Record>(`https://herefyp.herokuapp.com/api/record/${id}`)
            .toPromise();
    }
}
