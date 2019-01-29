export class PayRoll {
  totalHaberes: number;
  totalHaberesOtros: number;
  totalDescuentos: number;

  diasTrabajos: number;
  sueldo: number;
  valorHora: number;
  valorHoraExtra: number;
  descuentoHorasMonto: number;
  horasExtrasMonto: number;
  recargoDomingosMonto: number;
  recargoFeriadosMonto: number;
  bonoNocheMonto: number;
  bonoServicioMonto: number;
  bonoOperacionesMonto: number;
  bonoReserveMonto: number;
  bonoRequisitosEspecialesMonto: number;
  bonoAltoFlujoMonto: number;
  bonoPartnerMonto: number;
  bonoTrainerMonto: number;
  bonoReferidosMonto: number;
  bonoSuplenteMonto: number;
  bonoFiestasPatriasMonto: number;
  bonoOtrosMonto: number;
  gratificacionMonto: number;

  asignacionColacionMonto: number;
  asignacionMovilizacionMonto: number;
  asignacionTransporteMonto: number;
  asignacionSalaCunaMonto: number;
  asignacionOtro1Monto: number;
  asignacionOtro2Monto: number;
  asignacionCargasMonto: number;

  afpMonto: number;
  isapreMonto: number;
  seguroCesantiaMonto: number;
  cuotaSindicalMonto: number;
  cuotaExtraordinariaMonto: number;
  prestamosMonto: number;
  anticipioMonto: number;
  cuotaSeguroMonto: number;
  descuentos1Monto: number;
  descuentos2Monto: number;
  descuentos3Monto: number;

  getTotalHaberes(): number {
    return this.sueldo +
      this.descuentoHorasMonto +
      this.horasExtrasMonto +
      this.recargoDomingosMonto +
      this.recargoFeriadosMonto +
      this.bonoNocheMonto +
      this.bonoServicioMonto +
      this.bonoOperacionesMonto +
      this.bonoReserveMonto +
      this.bonoRequisitosEspecialesMonto +
      this.bonoAltoFlujoMonto +
      this.bonoPartnerMonto +
      this.bonoTrainerMonto +
      this.bonoReferidosMonto +
      this.bonoSuplenteMonto +
      this.bonoFiestasPatriasMonto +
      this.bonoOtrosMonto +
      this.gratificacionMonto;
  }

  getTotalHaberesOtros(): number {
    return this.asignacionColacionMonto +
      this.asignacionMovilizacionMonto +
      this.asignacionTransporteMonto +
      this.asignacionSalaCunaMonto +
      this.asignacionOtro1Monto +
      this.asignacionOtro2Monto +
      this.asignacionCargasMonto;
  }
}
