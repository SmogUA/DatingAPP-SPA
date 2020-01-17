import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() photos: Photo[];
uploader: FileUploader;
hasBaseDropZoneOver = false;
baseUrl = environment.apiUrl;

public fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}

  constructor(private authService: AuthService) { }

  ngOnInit() {
  this.initializeUploader();
  }

  initializeUploader() {
  this.uploader = new FileUploader({
    url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    isHTML5: true,
    allowedFileType: ['image'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 15 * 1024 * 1024
  });
}

}
