import { NgModule } from '@angular/core';
import { DocPipe } from './doc';

@NgModule({
    declarations: [
        DocPipe,
    ],
    exports: [
        DocPipe
    ]
})
export class DocModule { }
