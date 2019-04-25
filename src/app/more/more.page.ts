import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../util/baseui';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage extends BaseUI implements OnInit {
  public notLogin = true;
  public logined = false;
  public headface: string;
  // userInfo = {UserName: '克里斯先生'};
  userInfo = [];


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public commonSvc: CommonService) {
    super();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadUserPage();
  }

  async showModal() {
    this.navCtrl.navigateForward('/login');
    // const modal = await this.modalCtrl.create({ component: LoginPage });
    // modal.present();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.commonSvc.getUserInfo(val).subscribe(
          user => {
            this.userInfo = user;
            this.headface = this.userInfo['UserHeadface'] + '?' + ((new Date().valueOf()));
          }
        );
        this.logined = true;
        this.notLogin = false;
      } else {
        this.logined = false;
        this.notLogin = true;
      }
    });
  }

  goUserPage() {
    this.navCtrl.navigateForward('/user');
  }
}
