import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayOption } from '../pay-option';
import { PayRoll } from '../pay-roll';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.css']
})
export class PayFormComponent implements OnInit {
  payOption: PayOption = new PayOption();
  payRoll: PayRoll = new PayRoll();
  initData: any;

  constructor(private http: HttpClient) {
    this.http.get('./assets/initial-data.json').subscribe(data => {
      this.initData = data;
      console.log(data);
    });
  }

  ngOnInit() {

    /*
    this.payOption.sueldo = 100000;
    this.payOption.bonoNoche = true;
    this.payOption.cargo = "option2";
    this.payOption.afp = "2";
    */
  }

  getResult(): void {
    this.payRoll.diasTrabajos = 30 - this.payOption.ausenciasJustificadad - this.payOption.ausenciasInjustificadad;
    this.payRoll.sueldo = this.payOption.sueldo;
    this.payRoll.valorHora = ((this.payOption.sueldo * 30) * 7) / parseInt(this.payOption.jornada);
    this.payRoll.valorHoraExtra = this.payRoll.valorHora * 1.5;
    this.payRoll.descuentoHorasMonto = this.payOption.descuentoHoras * this.payRoll.valorHora;
    this.payRoll.horasExtrasMonto = this.payOption.horasExtras * this.payRoll.valorHoraExtra;
    this.payRoll.recargoDomingosMonto = this.payOption.recargoDomingos * (this.payRoll.valorHora * 0.3);
    this.payRoll.recargoFeriadosMonto = this.payOption.recargoFeriados * (this.payRoll.valorHora * 0.5);

    // Haberes
    this.payRoll.bonoNocheMonto = (this.payOption.bonoNoche) ?
      (this.getInitData('bonoNoche')) : 0;
    this.payRoll.bonoServicioMonto = (this.payOption.bonoServicio) ?
      (this.payOption.bonoServicio50 ? this.getInitData('bonoServicio50') : this.getInitData('bonoServicio100')) : 0;
    this.payRoll.bonoOperacionesMonto = (this.payOption.bonoOperaciones) ?
      (this.payOption.bonoOperacionesMonto) : 0;
    this.payRoll.bonoReserveMonto = (this.payOption.bonoReserve) ?
      (this.getInitData('bonoReserve')) : 0;
    this.payRoll.bonoRequisitosEspecialesMonto = (this.payOption.bonoRequisitosEspeciales) ?
      (this.getInitData('bonoRequisitosEspeciales') / 30) * this.payRoll.diasTrabajos : 0;
    this.payRoll.bonoAltoFlujoMonto = (this.payOption.bonoAltoFlujo) ?
      (this.getInitData('bonoAltoFlujo') / 30) * this.payRoll.diasTrabajos : 0;
    this.payRoll.bonoFiestasPatriasMonto = (this.payOption.bonoFiestasPatrias) ?
      (this.getInitData('bonoFiestasPatrias')) : 0;
    this.payRoll.bonoTrainerMonto = (this.payOption.bonoTrainer) ?
      (this.getInitData('bonoTrainer') * this.payOption.bonoTrainerCantidad) : 0;
    this.payRoll.bonoReferidosMonto =
      ((this.payOption.bonoReferidos3) ? this.getInitData('bonoReferidos3') : 0) * this.payOption.bonoReferidos3Cantidad +
      ((this.payOption.bonoReferidos9) ? this.getInitData('bonoReferidos9') : 0) * this.payOption.bonoReferidos9Cantidad;
    this.payRoll.bonoPartnerMonto =
      ((this.payOption.bonoPartnerAnnoActual) ? this.payOption.bonoPartnerAnnoActualMonto : 0) +
      ((this.payOption.bonoPartnerAnnoAnterior) ? this.payOption.bonoPartnerAnnoAnteriorMonto : 0);
    this.payRoll.bonoSuplenteMonto = (this.payOption.bonoSuplente) ?
      (this.payOption.bonoSuplenteCantidad * 720) : 0;
    this.payRoll.bonoOtrosMonto =
      ((this.payOption.bonoOtro1) ? this.payOption.bonoOtro1Monto : 0) +
      ((this.payOption.bonoOtro2) ? this.payOption.bonoOtro2Monto : 0) +
      ((this.payOption.bonoOtro3) ? this.payOption.bonoOtro3Monto : 0);
    this.payRoll.gratificacionMonto = ((this.payRoll.getTotalHaberes() * 4.75) / 12 < this.getInitData('immNacional') * 0.25) ?
      ((this.payRoll.getTotalHaberes() * 4.75) / 12) : (this.getInitData('immNacional') * 0.25);

    // Otros Haberes
    this.payRoll.asignacionColacionMonto = (this.payOption.asignacionColacion) ?
      ((this.getInitData('asignacionColacion') / 30) * this.payRoll.diasTrabajos ) : 0;
    this.payRoll.asignacionMovilizacionMonto = (this.payOption.asignacionMovilizacion) ?
      ((this.getInitData('asignacionMovilizacion') / 30) * this.payRoll.diasTrabajos ) : 0;
    this.payRoll.asignacionTransporteMonto = (this.payOption.asignacionTransporte) ?
      (this.payOption.asignacionTransporteMonto) : 0;
    this.payRoll.asignacionSalaCunaMonto = (this.payOption.asignacionSalaCuna) ?
      (this.getInitData('asignacionSalaCuna')) : 0;
    this.payRoll.asignacionOtro1Monto = (this.payOption.asignacionOtro1) ?
      (this.payOption.asignacionOtro1Monto) : 0;
    this.payRoll.asignacionOtro2Monto = (this.payOption.asignacionOtro2) ?
      (this.payOption.asignacionOtro2Monto) : 0;
    this.payRoll.asignacionCargasMonto = (this.payOption.asignacionCargas) ?
      (this.payOption.asignacionCargasMonto * this.payOption.asignacionCargasCantidad) : 0;

    this.payRoll.totalHaberes = this.payRoll.getTotalHaberes();
    this.payRoll.totalHaberesOtros = this.payRoll.getTotalHaberesOtros();

    // Descuentos
    this.payRoll.afpMonto = (this.getInitData('afps') / 100) * this.payRoll.totalHaberes;
    this.payRoll.isapreMonto = (this.getInitData('isapre') / 100) * this.payRoll.totalHaberes;
    this.payRoll.seguroCesantiaMonto = (this.getInitData('seguroCesantia') / 100) * this.payRoll.totalHaberes;
  }

  getInitData(name: string): number {
    if (this.initData[name][this.payOption.cargo] != null) {
      return parseInt(this.initData[name][this.payOption.cargo]);
    }
    else {
      return parseInt(this.initData[name][this.payOption.jornada]);
    }
  }

}
