import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify.service';

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

  constructor(private authService: AuthService, private  userService: UserService, private alertify: AlertifyService) { }

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
  this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
  this.uploader.onSuccessItem = (item, response, status, headers) => {
    if (response) {
      const res: Photo = JSON.parse(response);
      const photo = {
        id: res.id,
        url: res.url,
        dateAdded: res.dateAdded,
        description: res.description,
        isMain: res.isMain
      };
      this.photos.push(photo);
    }
  };
}

SetMainPhoto(photo: Photo) {
  this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
    // console.log(\'Successfully set to main');
    this.alertify.success('Successfully set to main');
  }, error => {
    this.alertify.error('AAAA');
  });
}

}
