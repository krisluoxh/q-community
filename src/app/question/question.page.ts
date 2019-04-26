import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../util/baseui';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage extends BaseUI implements OnInit {
  userId: string;
  title: string;
  content: string;
  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private commonSvc: CommonService,
    private toastCtrl: ToastController) {
    super();
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val !== null) {
        this.userId = val;
        const loading = super.showLoading(this.loadingCtrl, '发表中...');
        this.commonSvc.saveQuestion(val, this.title, this.content).subscribe((result) => {
          loading.then(l => l.dismiss());
          if (result['Status'] === 'OK') {
            const toast = super.showToast(this.toastCtrl, '提问成功！');
            this.modalCtrl.dismiss();
          } else {
            const toast = super.showToast(this.toastCtrl, result['StatusContent']);
          }
        }, (err) => {
          loading.then(l => l.dismiss());
          const toast = super.showToast(this.toastCtrl, err);
        });
      } else {
        const toast = super.showToast(this.toastCtrl, '请登录后提问');
      }
    });
  }

}
