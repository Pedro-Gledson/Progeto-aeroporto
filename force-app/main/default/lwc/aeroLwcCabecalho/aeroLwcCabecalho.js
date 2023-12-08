import { LightningElement,api } from "lwc";
import AEROModal from 'c/aeroModal';
export default class AeroLwcCabecalho extends LightningElement {
    @api tituloIata

   


     async confimarViagem(){
         await AEROModal.open({
            size: 'large',
            rotulo: `Confirmar ${this.tituloIata}`,
            local:  (this.tituloIata === 'Partida') ? 'aeroPartida' : 'aeroDestino'
        });
           
    }
               
}