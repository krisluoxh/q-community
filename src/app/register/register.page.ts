import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { CommonService } from '../services/common/common.service';
import { BaseUI } from '../util/baseui';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends BaseUI implements OnInit {
  mobile: string;
  userName: string;
  password: string;
  confirmPassword: string;
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public commonSvc: CommonService,
    public toastCtrl: ToastController
  ) {
    super();
  }

  ngOnInit() {
  }

  dismiss() {
    this.navCtrl.pop();
  }

  register() {
    if (this.password !== this.confirmPassword) {
      super.showToast(this.toastCtrl, '两次输入的密码不一致');
    } else {
      const loading = this.showLoading(this.loadingCtrl, '注册中...');
      this.commonSvc.regster(this.mobile, this.userName, this.password)
        .subscribe(
          r => {
            loading.then(l => l.dismiss());

            if (r['Status'] === 'OK') {
              super.showToast(this.toastCtrl, '注册成功');

              this.dismiss();
            } else {
              super.showToast(this.toastCtrl, r['StatusContent']);
            }
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  gotoLoginPage() {
    this.navCtrl.pop();
  }
}
