import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CommonService } from '../services/common/common.service';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../util/baseui';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage extends BaseUI implements OnInit {
  headFace: string;
  nickName = '加载中...';
  errorMsg: string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public commonSvc: CommonService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    super();
  }

  ngOnInit() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.commonSvc.getUserInfo(val).subscribe(
          user => {
            this.nickName = user['UserNickName'];
            this.headFace = user['UserHeadface'] + '?' + ((new Date().valueOf()));
          },
          error => this.errorMsg = <any>error
        );
      } else {

      }
    });
  }

  updateUserName() {
    this.storage.get('UserId').then(val => {
      if (val) {
        const loading = super.showLoading(this.loadingCtrl, '修改中');
        this.commonSvc.updateUserInfo(val, this.nickName).subscribe(result => {
          if (result['Status'] === 'OK') {
            loading.then(l => l.dismiss());
            super.showToast(this.toastCtrl, '昵称修改成功');
            this.navCtrl.back();
          } else {
            loading.then(l => l.dismiss());
            super.showToast(this.toastCtrl, result['StatusContent']);
          }
        },
          error => this.errorMsg = <any>error);
      }
    });
  }

  logout() {
    this.storage.remove('UserId');
    this.navCtrl.navigateRoot('/tabs/more');
  }
}
