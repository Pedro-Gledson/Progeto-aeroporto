import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class AEROModal extends LightningModal {
    @api partidaIata; 
    @api rotulo;

    fecharModal() {
        this.close('okay');
    }
}