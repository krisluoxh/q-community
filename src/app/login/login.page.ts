import { Component, OnInit } from '@angular/core';
import { BaseUI } from '../util/baseui';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from '../services/common/common.service';
import { Router } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseUI implements OnInit {
  mobile: string;
  password: string;
  errorMessage: string;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public commonSvc: CommonService,
    public toastCtrl: ToastController,
    public storage: Storage,
    public router: Router) {
    super();
  }

  ngOnInit() {
  }

  login() {
    const loading = super.showLoading(this.loadingCtrl, '登陆中...');
    this.commonSvc.login(this.mobile, this.password)
      .subscribe(f => {
        if (f['Status'] === 'OK') {
          this.storage.set('UserId', f['UserId']);
          loading.then(l => l.dismiss());
          this.navCtrl.navigateRoot('/tabs/more');
          // this.router.navigateByUrl('/tabs/more');
        } else {
          loading.then(l => l.dismiss());
          super.showToast(this.toastCtrl, f['StatusContent']);
        }
      }, error => {
        loading.then(l => l.dismiss());
        this.errorMessage = <any>error;
      });
  }

  dismiss() {
    this.navCtrl.navigateRoot('/tabs/more');
  }

  goRegisterPage() {
    this.navCtrl.navigateForward('/register');
    // this.modalCtrl.dismiss();
  }

}
