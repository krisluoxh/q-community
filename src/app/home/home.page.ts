import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { QuestionPage } from '../question/question.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async gotoQuestion(a: ModalOptions) {
    const modal = await this.modalCtrl.create({ component: QuestionPage });
    modal.present();
  }

}
