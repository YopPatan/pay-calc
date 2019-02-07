import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayOption } from '../pay-option';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.css']
})
export class PayFormComponent implements OnInit {
  payOption: PayOption = new PayOption();
  initData: any;
  enabled: boolean = true;

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) {
    this.http.get('https://pay-calc-patan.firebaseio.com/initial_data.json?print=pretty&format=export').subscribe(data => {
      this.initData = data;
      this.initData.tiendas = Object.entries(data['tiendas']).sort((a, b) => (a[1] < b[1]) ? -1 : 1);

      /*
      // Lee DOM en el momento que se ejecuta, aun no crea elementos
      const list1 = document.querySelectorAll('.mat-step');
      console.log('querySelectorAll', list1);
      */

      /*
      // Lee DOM permanentemente y actualiza con cambios, en primera instacia no lee elementos, despues si
      const list2 = document.getElementsByClassName('mat-step');
      console.log('getElementsByClassName', list2);
      */

      // Lee DOM pero despues que se crearon los elementos, rompe la linea de ejecucion ya que crea un nuevo hilo
      setTimeout(function() {
        //console.log(document.querySelectorAll('.mat-step'));
        Array.apply(null, document.querySelectorAll('.mat-step-header, .mat-raised-button')).forEach(item => {
          //console.log(item);
          item.addEventListener('click', data => {
            //console.log('entro');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          });
        });
      }, 0);


    });
  }

  ngOnInit() {
    this.message.currentMessage.subscribe(data => {
      if (data['action'] === 'back') {
        this.enabled = true;
      }
    });

    // TEST 1

    /*
    this.payOption.cargo = 'otro';
    this.payOption.jornada = '20';
    this.payOption.tienda = '16';
    this.payOption.sueldo = 100000;
    this.payOption.afp = 'habitat';
    */

    /*
    this.payOption.ausenciasJustificadas = 1;
    this.payOption.ausenciasInjustificadas = 2;

    this.payOption.horasExtras = 3;
    this.payOption.recargoDomingos = 4;
    this.payOption.recargoFeriados = 5;

    this.payOption.bonoNoche = true;
    this.payOption.bonoServicio = true;
    this.payOption.bonoServicio50 = true;
    this.payOption.bonoFiestasPatrias = true;
    this.payOption.bonoOperaciones = true;
    this.payOption.bonoOperacionesMonto = 5001;
    this.payOption.bonoTrainer = true;
    this.payOption.bonoTrainerCantidad = 11;
    this.payOption.bonoReserve = true;
    this.payOption.bonoRequisitosEspeciales = true;
    this.payOption.bonoAltoFlujo = true;
    this.payOption.bonoReferidos = true;
    this.payOption.bonoReferidos3 = true;
    this.payOption.bonoReferidos3Cantidad = 6;
    this.payOption.bonoPartner = true;
    this.payOption.bonoPartnerAnnoAnterior = true;
    this.payOption.bonoPartnerAnnoAnteriorMonto = 5002;
    this.payOption.bonoOtro1 = true;
    this.payOption.bonoOtro1Monto = 5003;
    this.payOption.bonoSuplente = true;
    this.payOption.bonoSuplenteCantidad = 7;

    this.payOption.asignacionColacion = true;
    this.payOption.asignacionMovilizacion = true;
    this.payOption.asignacionCargas = true;
    this.payOption.asignacionCargasCantidad = 8;
    this.payOption.asignacionCargasMonto = 5004;
    this.payOption.asignacionTransporte = true;
    this.payOption.asignacionTransporteMonto = 5005;
    this.payOption.asignacionSalaCuna = true;
    this.payOption.asignacionOtro1 = true;
    this.payOption.asignacionOtro1Monto = 5006;

    this.payOption.prestamos1 = 5007;
    this.payOption.prestamos2 = 5008;
    this.payOption.prestamos3 = 5009;
    this.payOption.descuentos1 = 5010;
    this.payOption.descuentos2 = 5011;
    this.payOption.descuentos3 = 5012;
    this.payOption.cuotaSeguro = 5013;
    this.payOption.cuotaSindical = 'si';
    this.payOption.cuotaExtraordinaria1 = 5014;
    this.payOption.cuotaExtraordinaria2 = 5015;
    this.payOption.cuotaExtraordinaria3 = 5016;
    this.payOption.ahorro = 5017;
    this.payOption.descuentoHoras = 8;
    */

    // TEST 2
    /*
    this.payOption.cargo = 'barista';
    this.payOption.jornada = '30';
    this.payOption.tienda = '16';
    this.payOption.sueldo = 254321;
    this.payOption.afp = 'modelo';
    this.payOption.ausenciasJustificadas = 11;
    this.payOption.recargoDomingos = 17.5;
    this.payOption.bonoOperaciones = true;
    this.payOption.bonoOperacionesMonto = 35764;
    this.payOption.bonoAltoFlujo = true;
    this.payOption.bonoPartner = true;
    this.payOption.bonoPartnerAnnoAnterior = true;
    this.payOption.bonoPartnerAnnoAnteriorMonto = 105588;
    this.payOption.bonoPartnerAnnoActual = true;
    this.payOption.bonoPartnerAnnoActualMonto = 159690;
    this.payOption.bonoOtro1 = true;
    this.payOption.bonoOtro1Monto = 952;
    this.payOption.asignacionColacion = true;
    this.payOption.asignacionMovilizacion = true;
    this.payOption.asignacionTransporte = true;
    this.payOption.asignacionTransporteMonto = 9000;
    this.payOption.descuentos1 = 174;
    this.payOption.cuotaSindical = 'si';
    this.payOption.cuotaSeguro = 4074;
    */

  }

  getResult(): void {
    this.message.changeMessage(this.payOption);
    this.enabled = false;
  }

  getCheckForm(): boolean {
    if (this.payOption.cargo != null && this.payOption.jornada != null && this.payOption.tienda != null && this.payOption.sueldo != null && this.payOption.afp != null &&
      this.payOption.cargo !== '' && this.payOption.jornada !== '' && this.payOption.tienda !== '' && this.payOption.sueldo > 0) {
      return true;
    }
    else {
      return false;
    }
  }

}
