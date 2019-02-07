export class PayRoll {
  totalHaberesImponibles: number;
  totalHaberesOtros: number;
  totalHaberes: number;
  totalDescuentosLegales: number;
  totalDescuentosOtros: number;
  totalDescuentos: number;
  totalLiquido: number;

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
  bonoTrainerMonto: number;
  bonoReferidosMonto: number;
  bonoSuplenteMonto: number;
  bonoOtrosMonto: number;
  bonoFiestasPatriasMonto: number = 0;
  bonoPartnerMonto: number = 0;
  gratificacionMonto: number = 0;

  asignacionColacionMonto: number ;
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
  ahorroMonto: number;

  getTotalHaberes(): number {
    return this.sueldo -
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
      this.bonoTrainerMonto +
      this.bonoReferidosMonto +
      this.bonoSuplenteMonto +
      this.bonoOtrosMonto +
      this.bonoFiestasPatriasMonto +
      this.bonoPartnerMonto +
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

  getTotalDescuentos(): number {
    return this.afpMonto +
    this.isapreMonto +
    this.seguroCesantiaMonto;
  }

  getTotalDescuentosOtros(): number {
    return this.cuotaSindicalMonto +
      this.cuotaExtraordinariaMonto +
      this.prestamosMonto +
      this.anticipioMonto +
      this.cuotaSeguroMonto +
      this.descuentos1Monto +
      this.descuentos2Monto +
      this.descuentos3Monto +
      this.ahorroMonto;
  }
}
