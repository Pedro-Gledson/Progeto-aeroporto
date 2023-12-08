import { LightningElement } from "lwc";
import getAeroportos from "@salesforce/apex/ComponenteAeroporto.getAeroportos";
import getAeroporto from "@salesforce/apex/ComponenteAeroporto.getAeroporto";
import calculateDistance from "@salesforce/apex/ComponenteAeroporto.calculateDistance";
export default class AeroLwcAeroportos extends LightningElement {
  aeroportos = [];
  aeroPartida = "";
  aeroDestino = "";
  partidaId = "";
  partidaLatitude = "";
  partidaLongitude = "";
  partidaIata = "";
  destinoId = "";
  destinoLatitude = "";
  destinoLongitude = "";
  destinoIata = "";
  opcoes = [];
  destinoF = 0;
  timer = 0;
  tituloIata= '';
  connectedCallback() {
    getAeroportos().then((resultado) => {
      let selecao = [];
      for (let i = 0; i < resultado.length; i++) {
        selecao.push({
          label: resultado[i].Name,
          value: resultado[i].Id,
          latitude: resultado[i].Coodenadas__Latitude__s,
          longitude: resultado[i].Coodenadas__Longitude__s,
          iata: resultado[i].IATA__c
        });
      }
      this.aeroportos = selecao;
    });
  }
  get options() {
    return this.aeroportos;
  }

  selecionarPartida(event) {
    getAeroporto({ id: `${event.target.value}` }).then((resultado) => {
      this.partidaId = resultado[0].Id;
      this.partidaLatitude = resultado[0].Coodenadas__Latitude__s;
      this.partidaLongitude = resultado[0].Coodenadas__Longitude__s;
      this.partidaIata = resultado[0].IATA__c;
    });
  }
  selecionarDestino(event) {
    getAeroporto({ id: `${event.target.value}` }).then((resultado) => {
      this.destinoId = resultado[0].Id;
      this.destinoLatitude = resultado[0].Coodenadas__Latitude__s;
      this.destinoLongitude = resultado[0].Coodenadas__Longitude__s;
      this.destinoIata = resultado[0].IATA__c;
    });
  }

  distanciaFinal(event) {
    calculateDistance({
      latitude1: this.partidaLatitude,
      longitude1: this.partidaLongitude,
      latitude2: this.destinoLatitude,
      longitude2: this.destinoLongitude
    })
      .then((resultado) => {
        this.destinoF = resultado;
        console.log(resultado);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  get calculoRealizado(){
    if(this.destinoF !== 0){
        return true;
    }
    return false;
  }
        iataDePartida(){
          this.tituloIata = 'Partida'
        }
        iataDeDestino(){
          this.tituloIata= 'Chegada'

        }

}
