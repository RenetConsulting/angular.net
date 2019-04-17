import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import { FileListModule } from '../file-list/file-list.module';
import { EditorComponent } from './editor.component';

@NgModule({
    declarations: [EditorComponent],
    exports: [EditorComponent],
    imports: [
        CommonModule,
        QuillModule,
        ReactiveFormsModule,
        MatDialogModule,
        FileListModule
    ]
})
export class EditorModule { }
