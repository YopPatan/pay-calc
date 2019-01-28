import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayOption } from '../pay-option';
import { PayRoll } from "../pay-roll";

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
    this.http.get("./assets/initial-data.json").subscribe(data => {
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
    this.payRoll.bonoNocheMonto = (this.payOption.bonoNoche) ? parseInt(this.initData.bonoNoche[this.payOption.jornada]) : 0;
    this.payRoll.bonoServicioMonto = (this.payOption.bonoServicio) ? (this.payOption.bonoServicio50 ? parseInt(this.initData.bonoServicio50[this.payOption.jornada]) : parseInt(this.initData.bonoServicio100[this.payOption.jornada])) : 0;
    this.payRoll.bonoOperacionesMonto = (this.payOption.bonoOperaciones) ? this.payOption.bonoOperacionesMonto : 0;
    this.payRoll.bonoReserveMonto = (this.payOption.bonoReserve) ? parseInt(this.initData.bonoReserve[this.payOption.jornada]) : 0;
    this.payRoll.bonoRequisitosEspecialesMonto = (this.payOption.bonoRequisitosEspeciales) ? ((parseInt(this.initData.bonoRequisitosEspeciales[this.payOption.jornada]) / 30) * this.payRoll.diasTrabajos) : 0;
    this.payRoll.bonoAltoFlujoMonto = (this.payOption.bonoAltoFlujo) ? ((parseInt(this.initData.bonoAltoFlujo[this.payOption.jornada]) / 30) * this.payRoll.diasTrabajos) : 0;
    //this.payRoll.bonoPartnerMonto = (this.payOption.bonoPartner)
  }

}
