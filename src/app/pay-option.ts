export class PayOption {
  cargo: string;
  jornada: string;
  tienda: string;

  sueldo: number;
  ausenciasJustificadad: number;
  ausenciasInjustificadad: number;
  horasExtras: number;
  recargoDomingos: number;
  recargoFeriados: number;

  bonoNoche: boolean;
  bonoServicio: boolean;
  bonoServicio50: boolean;
  bonoServicio100: boolean;
  bonoFiestasPatrias: boolean;
  bonoOperaciones: boolean;
  bonoOperacionesMonto: number;
  bonoReserve: boolean;
  bonoRequisitosEspeciales: boolean;
  bonoAltoFlujo: boolean;
  bonoReferidos: boolean;
  bonoReferidos3: boolean;
  bonoReferidos3Cantidad: number;
  bonoReferidos9: boolean;
  bonoReferidos9Cantidad: number;
  bonoPartner: boolean;
  bonoPartnerAnnoAnterior: boolean;
  bonoPartnerAnnoAnteriorMonto: number;
  bonoPartnerAnnoActual: boolean;
  bonoPartnerAnnoActualMonto: number;
  bonoOtro1: boolean;
  bonoOtro1Monto: number;
  bonoOtro2: boolean;
  bonoOtro2Monto: number;
  bonoOtro3: boolean;
  bonoOtro3Monto: number;
  bonoSuplente: boolean;
  bonoSuplenteMonto: number;

  bonoColacion: boolean;
  bonoMovilizacion: boolean;
  asignacionCargas: boolean;
  asignacionCargasCantidad: number;
  asignacionCargasMonto: number;
  asignacionTransporte: boolean;
  asignacionTransporteMonto: number;
  asignacionSalaCuna: boolean;
  asignacionOtro1: boolean;
  asignacionOtro1Monto: number;
  asignacionOtro2: boolean;
  asignacionOtro2Monto: number;

  afp: string;
  prestamos1: number;
  prestamos2: number;
  prestamos3: number;
  descuentos1: number;
  descuentos2: number;
  descuentos3: number;
  cuotaSeguro: number;
  sindicado: number;
  cuotaExtraordinaria1: number;
  cuotaExtraordinaria2: number;
  cuotaExtraordinaria3: number;
  descuentoHoras: number;
}
