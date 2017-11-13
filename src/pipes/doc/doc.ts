import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
/**
 * Generated class for the DocPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'doc',
})
export class DocPipe implements PipeTransform {
    constructor(public afs: AngularFirestore) { }
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: string): Observable<any> {
        var path = `/doctor/${value}`;
        return this.afs.doc(path).snapshotChanges().map(doc => {
            return doc.payload.data()
        })

    }
}
