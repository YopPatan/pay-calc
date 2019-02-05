import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayOption } from '../pay-option';
import { PayRoll } from '../pay-roll';
import { MessageService } from '../message.service';

import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrls: ['./pay-roll.component.css']
})
export class PayRollComponent implements OnInit {

  payOption: PayOption = new PayOption();
  payRoll: PayRoll = new PayRoll();
  initAmounts: any;
  initData: any;
  enabled: boolean = false;
  today = new Date();
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private firestore: AngularFirestore
  ) {
    this.http.get('https://pay-calc-patan.firebaseio.com/initial_amounts.json?print=pretty&format=export').subscribe(data => {
      this.initAmounts = data;
      console.log(data);
    });
    this.http.get('https://pay-calc-patan.firebaseio.com/initial_data.json?print=pretty&format=export').subscribe(data => {
      this.initData = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.message.currentMessage.subscribe(data => {
      if (data['sueldo'] != null) {
        console.log(data);
        this.payOption = data as PayOption;

        this.payRoll.diasTrabajos = 30 - this.val(this.payOption.ausenciasJustificadas) - this.val(this.payOption.ausenciasInjustificadas);
        this.payRoll.sueldo = (this.payOption.sueldo / 30) * this.payRoll.diasTrabajos;
        this.payRoll.valorHora = ((this.payOption.sueldo / 30) * 7) / parseInt(this.payOption.jornada);
        this.payRoll.valorHoraExtra = this.payRoll.valorHora * 1.5;
        this.payRoll.descuentoHorasMonto = this.val(this.payOption.descuentoHoras) * this.payRoll.valorHora;
        this.payRoll.horasExtrasMonto = this.val(this.payOption.horasExtras) * this.payRoll.valorHoraExtra;
        this.payRoll.recargoDomingosMonto = this.val(this.payOption.recargoDomingos) * (this.payRoll.valorHora * 0.3);
        this.payRoll.recargoFeriadosMonto = this.val(this.payOption.recargoFeriados) * (this.payRoll.valorHora * 0.5);

        // Haberes
        this.payRoll.bonoNocheMonto = (this.payOption.bonoNoche) ?
          ((this.getInitAmounts('bonoNoche') / 30) * this.payRoll.diasTrabajos) : 0;
        this.payRoll.bonoServicioMonto = (this.payOption.bonoServicio) ?
          (this.payOption.bonoServicio100 ? this.getInitAmounts('bonoServicio100') : this.getInitAmounts('bonoServicio50')) : 0;
        this.payRoll.bonoOperacionesMonto = (this.payOption.bonoOperaciones) ?
          (this.val(this.payOption.bonoOperacionesMonto)) : 0;
        this.payRoll.bonoReserveMonto = (this.payOption.bonoReserve) ?
          (this.getInitAmounts('bonoReserve')) : 0;
        this.payRoll.bonoRequisitosEspecialesMonto = (this.payOption.bonoRequisitosEspeciales) ?
          (this.getInitAmounts('bonoRequisitosEspeciales') / 30) * this.payRoll.diasTrabajos : 0;
        this.payRoll.bonoAltoFlujoMonto = (this.payOption.bonoAltoFlujo) ?
          (this.getInitAmounts('bonoAltoFlujo') / 30) * this.payRoll.diasTrabajos : 0;
        this.payRoll.bonoFiestasPatriasMonto = (this.payOption.bonoFiestasPatrias) ?
          (this.getInitAmounts('bonoFiestasPatrias')) : 0;
        this.payRoll.bonoTrainerMonto = (this.payOption.bonoTrainer) ?
          (this.getInitAmounts('bonoTrainer') * this.val(this.payOption.bonoTrainerCantidad)) : 0;
        this.payRoll.bonoReferidosMonto =
          ((this.payOption.bonoReferidos3) ? this.getInitAmounts('bonoReferidos3') * this.val(this.payOption.bonoReferidos3Cantidad) : 0 ) +
          ((this.payOption.bonoReferidos9) ? this.getInitAmounts('bonoReferidos9') * this.val(this.payOption.bonoReferidos9Cantidad) : 0);
        this.payRoll.bonoPartnerMonto =
          ((this.payOption.bonoPartnerAnnoActual) ? this.val(this.payOption.bonoPartnerAnnoActualMonto) : 0) +
          ((this.payOption.bonoPartnerAnnoAnterior) ? this.val(this.payOption.bonoPartnerAnnoAnteriorMonto) : 0);
        this.payRoll.bonoSuplenteMonto = (this.payOption.bonoSuplente) ?
          (this.val(this.payOption.bonoSuplenteCantidad) * 720) : 0;
        this.payRoll.bonoOtrosMonto =
          ((this.payOption.bonoOtro1) ? this.val(this.payOption.bonoOtro1Monto) : 0) +
          ((this.payOption.bonoOtro2) ? this.val(this.payOption.bonoOtro2Monto) : 0) +
          ((this.payOption.bonoOtro3) ? this.val(this.payOption.bonoOtro3Monto) : 0);

        console.log('gratificaicon opcion 1: ' + (this.getInitAmounts('immNacional') * 4.75) / 12);
        console.log('gratificaicon opcion 2: ' + this.payRoll.getTotalHaberes() * 0.25);
        console.log('total haberes sin gratificacion: ' + this.payRoll.getTotalHaberes());

        this.payRoll.gratificacionMonto = ((this.getInitAmounts('immNacional') * 4.75) / 12 < this.payRoll.getTotalHaberes() * 0.25) ?
          ((this.getInitAmounts('immNacional') * 4.75) / 12) : (this.payRoll.getTotalHaberes() * 0.25);

        console.log('total haberes: ' + this.payRoll.getTotalHaberes());

        // Otros Haberes
        this.payRoll.asignacionColacionMonto = (this.payOption.asignacionColacion) ?
          ((this.getInitAmounts('asignacionColacion') / 30) * this.payRoll.diasTrabajos ) : 0;
        this.payRoll.asignacionMovilizacionMonto = (this.payOption.asignacionMovilizacion) ?
          ((this.getInitAmounts('asignacionMovilizacion') / 30) * this.payRoll.diasTrabajos ) : 0;
        this.payRoll.asignacionTransporteMonto = (this.payOption.asignacionTransporte) ?
          (this.val(this.payOption.asignacionTransporteMonto)) : 0;
        this.payRoll.asignacionSalaCunaMonto = (this.payOption.asignacionSalaCuna) ?
          (this.getInitAmounts('asignacionSalaCuna')) : 0;
        this.payRoll.asignacionOtro1Monto = (this.payOption.asignacionOtro1) ?
          (this.val(this.payOption.asignacionOtro1Monto)) : 0;
        this.payRoll.asignacionOtro2Monto = (this.payOption.asignacionOtro2) ?
          (this.val(this.payOption.asignacionOtro2Monto)) : 0;
        this.payRoll.asignacionCargasMonto = (this.payOption.asignacionCargas) ?
          (this.val(this.payOption.asignacionCargasMonto) * this.val(this.payOption.asignacionCargasCantidad)) : 0;

        this.payRoll.totalHaberesImponibles = this.payRoll.getTotalHaberes();
        this.payRoll.totalHaberesOtros = this.payRoll.getTotalHaberesOtros();

        // Descuentos
        console.log('afp: ' + this.getInitAmounts('afps'));
        this.payRoll.afpMonto = (this.getInitAmounts('afps') / 100) * this.payRoll.totalHaberesImponibles;
        this.payRoll.isapreMonto = (this.getInitAmounts('isapre') / 100) * this.payRoll.totalHaberesImponibles;
        this.payRoll.seguroCesantiaMonto = (this.getInitAmounts('seguroCesantia') / 100) * this.payRoll.totalHaberesImponibles;

        this.payRoll.cuotaSindicalMonto = (this.payOption.cuotaSindical) ?
          (this.getInitAmounts('cuotaSindical')) : 0;
        this.payRoll.cuotaExtraordinariaMonto = this.val(this.payOption.cuotaExtraordinaria1) + this.val(this.payOption.cuotaExtraordinaria2) + this.val(this.payOption.cuotaExtraordinaria3);
        this.payRoll.prestamosMonto = this.val(this.payOption.prestamos1) + this.val(this.payOption.prestamos2) + this.val(this.payOption.prestamos3);
        this.payRoll.anticipioMonto = (this.payRoll.bonoPartnerMonto + this.payRoll.bonoFiestasPatriasMonto) * 0.8;
        this.payRoll.cuotaSeguroMonto = this.val(this.payOption.cuotaSeguro);
        this.payRoll.descuentos1Monto = this.val(this.payOption.descuentos1);
        this.payRoll.descuentos2Monto = this.val(this.payOption.descuentos2);
        this.payRoll.descuentos3Monto = this.val(this.payOption.descuentos3);
        this.payRoll.ahorroMonto = this.val(this.payOption.ahorro);

        this.payRoll.totalDescuentosLegales = this.payRoll.getTotalDescuentos();
        this.payRoll.totalDescuentosOtros = this.payRoll.getTotalDescuentosOtros();
        this.payRoll.totalHaberes = this.payRoll.totalHaberesImponibles + this.payRoll.totalHaberesOtros;
        this.payRoll.totalDescuentos = this.payRoll.totalDescuentosLegales + this.payRoll.totalDescuentosOtros;
        this.payRoll.totalLiquido = this.payRoll.totalHaberes - this.payRoll.totalDescuentos;
        this.enabled = true;

        this.firestore.collection('pay_rolls').add(Object.assign({}, this.payRoll));

        /*
        this.firestore.collection('cats').snapshotChanges().subscribe((catsSnapshot) => {
          console.log(catsSnapshot.map((catData: any) => catData.payload.doc.data()));
        });
        */

        console.log(this.payRoll);
      }
    });
  }

  getBack(): void {
    this.message.changeMessage({action: 'back'});
    this.enabled = false;
  }

  getInitAmounts(name: string): number {
    if (this.initAmounts[name][this.payOption.cargo] != null) {
      return parseInt(this.initAmounts[name][this.payOption.cargo]);
    }
    else if (this.initAmounts[name][this.payOption.jornada] != null) {
      return parseInt(this.initAmounts[name][this.payOption.jornada]);
    }
    else if (this.initAmounts[name][this.payOption.afp] != null) {
      return parseFloat(this.initAmounts[name][this.payOption.afp]);
    }
    else {
      return parseFloat(this.initAmounts[name]);
    }
  }

  val(value: number): number {
    if (value !== null && value > 0) {
      return value;
    }
    else {
      return 0;
    }
  }

}
