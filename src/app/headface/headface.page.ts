import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { CommonService } from '../services/common/common.service';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../util/baseui';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-headface',
  templateUrl: './headface.page.html',
  styleUrls: ['./headface.page.scss'],
})
export class HeadfacePage extends BaseUI implements OnInit {
  private win: any = window;
  userId: string;
  errorMsg: string;
  lastImage: string;


  constructor(public actionSheetController: ActionSheetController,
    public storage: Storage,
    public commonSvc: CommonService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public camera: Camera,
    public file: File,
    public transfer: FileTransfer,
    public filePath: FilePath,
    public platform: Platform,
    public webview: WebView) {
    super();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.userId = val;
      }
    });
  }

  async selectPicture() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择图片',
      buttons: [{
        text: '从图片库中选择',
        icon: 'folder',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: '使用相机',
        icon: 'camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: '取消',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  takePicture(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

          this.copyFileToLocalDir(correctPath, currentName, this.createFimeName());
        });
      } else {
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFimeName());

      }
    }, (err) => {
      super.showToast(this.toastCtrl, '选择图片出现错误');
    });
  }

  copyFileToLocalDir(path, name, newName) {
    this.file.copyFile(path, name, this.file.dataDirectory, newName).then(success => {
      this.lastImage = newName;
    }, error => {
      super.showToast(this.toastCtrl, '存储图片到本地图片出现错误');
    });
  }

  createFimeName() {
    const d = new Date();
    const n = d.getTime();
    const newFileName = n + '.jpg';
    return newFileName;
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      // return this.win.Ionic.WebView.convertFileSrc(this.file.dataDirectory + img);

      return this.webview.convertFileSrc(this.file.dataDirectory + img);
    }
  }

  uploadImg() {
    const url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    const targetPath = this.pathForImage(this.lastImage);
    const fileName = this.userId + '.jpg';

    const option = {
      fileKey: 'file',
      fileName: fileName,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'fileName': fileName, 'userid': this.userId }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    const loading = super.showLoading(this.loadingCtrl, '上传中...');

    fileTransfer.upload(targetPath, url, option).then(data => {
      loading.then(l => l.dismiss());
      super.showToast(this.toastCtrl, '图片上传成功');
      setTimeout(() => {
        super.showToast(this.toastCtrl, '图片上传错误， 请重试');
      }, 2000);
    });
  }
}
