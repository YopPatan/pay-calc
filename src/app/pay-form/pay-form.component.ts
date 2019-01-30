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

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) {
    this.http.get('./assets/initial-data.json').subscribe(data => {
      this.initData = data;
      console.log(data);
    });
  }

  ngOnInit() {
    // TEST 1
    this.payOption.cargo = 'otro';
    this.payOption.jornada = '20';
    this.payOption.tienda = '16';

    this.payOption.sueldo = 100000;
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

    this.payOption.afp = 'habitat';
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
    this.payOption.descuentoHoras = 8;
  }

  getResult(): void {
    this.message.changeMessage(this.payOption);
  }



}
