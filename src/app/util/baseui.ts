import { LoadingController, ToastController } from '@ionic/angular';

export abstract class BaseUI {
    constructor() { }

    protected async showLoading(loadingCtrl: LoadingController, message: string) {
        const loader = await loadingCtrl.create({
            message: message
        });

        await loader.present();
        return loader;
    }

    protected async showToast(toastCtrl: ToastController, message: string) {
        const toast = await toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });

        await toast.present();
        return toast;
    }
}
