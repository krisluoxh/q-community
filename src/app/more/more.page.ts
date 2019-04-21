import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  public notLogin = true;
  public logined = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public storage: Storage) { }

  ngOnInit() {
    this.loadUserPage();
  }

  async showModal() {
    const modal = await this.modalCtrl.create({ component: LoginPage });
    modal.present();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.logined = true;
        this.notLogin = false;
      } else {
        this.logined = false;
        this.notLogin = true;
      }
    });
  }
}
