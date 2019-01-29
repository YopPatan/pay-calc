import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayOption } from '../pay-option';
import { PayRoll } from '../pay-roll';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrls: ['./pay-roll.component.css']
})
export class PayRollComponent implements OnInit {

  payOption: PayOption = new PayOption();
  payRoll: PayRoll = new PayRoll();
  initAmounts: any;

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) {
    this.http.get('./assets/initial-amounts.json').subscribe(data => {
      this.initAmounts = data;
      console.log(data);
    });
  }

  ngOnInit() {
    this.message.currentMessage.subscribe(data => {
      if (data['sueldo'] != null) {
        console.log(data);
        this.payOption = data as PayOption;

        this.payRoll.diasTrabajos = 30 - this.payOption.ausenciasJustificadas - this.payOption.ausenciasInjustificadas;
        this.payRoll.sueldo = this.payOption.sueldo;
        this.payRoll.valorHora = ((this.payOption.sueldo / 30) * 7) / parseInt(this.payOption.jornada);
        this.payRoll.valorHoraExtra = this.payRoll.valorHora * 1.5;
        this.payRoll.descuentoHorasMonto = this.payOption.descuentoHoras * this.payRoll.valorHora;
        this.payRoll.horasExtrasMonto = this.payOption.horasExtras * this.payRoll.valorHoraExtra;
        this.payRoll.recargoDomingosMonto = this.payOption.recargoDomingos * (this.payRoll.valorHora * 0.3);
        this.payRoll.recargoFeriadosMonto = this.payOption.recargoFeriados * (this.payRoll.valorHora * 0.5);

        // Haberes
        this.payRoll.bonoNocheMonto = (this.payOption.bonoNoche) ?
          (this.getInitAmounts('bonoNoche')) : 0;
        this.payRoll.bonoServicioMonto = (this.payOption.bonoServicio) ?
          (this.payOption.bonoServicio50 ? this.getInitAmounts('bonoServicio50') : this.getInitAmounts('bonoServicio100')) : 0;
        this.payRoll.bonoOperacionesMonto = (this.payOption.bonoOperaciones) ?
          (this.payOption.bonoOperacionesMonto) : 0;
        this.payRoll.bonoReserveMonto = (this.payOption.bonoReserve) ?
          (this.getInitAmounts('bonoReserve')) : 0;
        this.payRoll.bonoRequisitosEspecialesMonto = (this.payOption.bonoRequisitosEspeciales) ?
          (this.getInitAmounts('bonoRequisitosEspeciales') / 30) * this.payRoll.diasTrabajos : 0;
        this.payRoll.bonoAltoFlujoMonto = (this.payOption.bonoAltoFlujo) ?
          (this.getInitAmounts('bonoAltoFlujo') / 30) * this.payRoll.diasTrabajos : 0;
        this.payRoll.bonoFiestasPatriasMonto = (this.payOption.bonoFiestasPatrias) ?
          (this.getInitAmounts('bonoFiestasPatrias')) : 0;
        this.payRoll.bonoTrainerMonto = (this.payOption.bonoTrainer) ?
          (this.getInitAmounts('bonoTrainer') * this.payOption.bonoTrainerCantidad) : 0;
        this.payRoll.bonoReferidosMonto =
          ((this.payOption.bonoReferidos3) ? this.getInitAmounts('bonoReferidos3') : 0) * this.payOption.bonoReferidos3Cantidad +
          ((this.payOption.bonoReferidos9) ? this.getInitAmounts('bonoReferidos9') : 0) * this.payOption.bonoReferidos9Cantidad;
        this.payRoll.bonoPartnerMonto =
          ((this.payOption.bonoPartnerAnnoActual) ? this.payOption.bonoPartnerAnnoActualMonto : 0) +
          ((this.payOption.bonoPartnerAnnoAnterior) ? this.payOption.bonoPartnerAnnoAnteriorMonto : 0);
        this.payRoll.bonoSuplenteMonto = (this.payOption.bonoSuplente) ?
          (this.payOption.bonoSuplenteCantidad * 720) : 0;
        this.payRoll.bonoOtrosMonto =
          ((this.payOption.bonoOtro1) ? this.payOption.bonoOtro1Monto : 0) +
          ((this.payOption.bonoOtro2) ? this.payOption.bonoOtro2Monto : 0) +
          ((this.payOption.bonoOtro3) ? this.payOption.bonoOtro3Monto : 0);
        this.payRoll.gratificacionMonto = ((this.payRoll.getTotalHaberes() * 4.75) / 12 < this.getInitAmounts('immNacional') * 0.25) ?
          ((this.payRoll.getTotalHaberes() * 4.75) / 12) : (this.getInitAmounts('immNacional') * 0.25);

        // Otros Haberes
        this.payRoll.asignacionColacionMonto = (this.payOption.asignacionColacion) ?
          ((this.getInitAmounts('asignacionColacion') / 30) * this.payRoll.diasTrabajos ) : 0;
        this.payRoll.asignacionMovilizacionMonto = (this.payOption.asignacionMovilizacion) ?
          ((this.getInitAmounts('asignacionMovilizacion') / 30) * this.payRoll.diasTrabajos ) : 0;
        this.payRoll.asignacionTransporteMonto = (this.payOption.asignacionTransporte) ?
          (this.payOption.asignacionTransporteMonto) : 0;
        this.payRoll.asignacionSalaCunaMonto = (this.payOption.asignacionSalaCuna) ?
          (this.getInitAmounts('asignacionSalaCuna')) : 0;
        this.payRoll.asignacionOtro1Monto = (this.payOption.asignacionOtro1) ?
          (this.payOption.asignacionOtro1Monto) : 0;
        this.payRoll.asignacionOtro2Monto = (this.payOption.asignacionOtro2) ?
          (this.payOption.asignacionOtro2Monto) : 0;
        this.payRoll.asignacionCargasMonto = (this.payOption.asignacionCargas) ?
          (this.payOption.asignacionCargasMonto * this.payOption.asignacionCargasCantidad) : 0;

        this.payRoll.totalHaberes = this.payRoll.getTotalHaberes();
        this.payRoll.totalHaberesOtros = this.payRoll.getTotalHaberesOtros();

        // Descuentos
        this.payRoll.afpMonto = (this.getInitAmounts('afps') / 100) * this.payRoll.totalHaberes;
        this.payRoll.isapreMonto = (this.getInitAmounts('isapre') / 100) * this.payRoll.totalHaberes;
        this.payRoll.seguroCesantiaMonto = (this.getInitAmounts('seguroCesantia') / 100) * this.payRoll.totalHaberes;

        this.payRoll.cuotaSindicalMonto = (this.payOption.cuotaSindical) ?
          (this.getInitAmounts('cuotaSindical')) : 0;
        this.payRoll.cuotaExtraordinariaMonto = this.payOption.cuotaExtraordinaria1 + this.payOption.cuotaExtraordinaria2 + this.payOption.cuotaExtraordinaria3;
        this.payRoll.prestamosMonto = this.payOption.prestamos1 + this.payOption.prestamos2 + this.payOption.prestamos3;
        this.payRoll.anticipioMonto = (this.payRoll.bonoPartnerMonto + this.payRoll.bonoFiestasPatriasMonto) * 0.8;
        this.payRoll.cuotaSeguroMonto = this.payOption.cuotaSeguro;
        this.payRoll.descuentos1Monto = this.payOption.descuentos1;
        this.payRoll.descuentos2Monto = this.payOption.descuentos2;
        this.payRoll.descuentos3Monto = this.payOption.descuentos3;

        console.log(this.payRoll);

      }
    });
  }

  getInitAmounts(name: string): number {
    if (this.initAmounts[name][this.payOption.cargo] != null) {
      return parseInt(this.initAmounts[name][this.payOption.cargo]);
    }
    else {
      return parseInt(this.initAmounts[name][this.payOption.jornada]);
    }
  }

}
