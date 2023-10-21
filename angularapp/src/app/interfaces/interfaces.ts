export interface IAbcAcreedore {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Rfc: string;
  Scta: string;
}
export interface IAbcActividade {
  Clave: number;
  Actividad: string;
  CUsuario: number | null;
  Descripcion: string;
  EsDiaria: any;
  EsMensual: any;
  EsSemanal: any;
  Fecha: Date | null;
}
export interface IAbcActivosFijo {
  Clave: number;
  CUsuario: number | null;
  CostoInicial: any;
  CtaContable: string;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcBodega {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcCentrosDeCosto {
  Clave: number;
  CCultivo: number | null;
  CTemporada: number | null;
  CUsuario: number | null;
  CostoAcumulado: any;
  CtaContable: string;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcCliente {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Rfc: string;
  Scta: string;
}
export interface IAbcCuadrilla {
  Clave: number;
  CEmpleado: number | null;
  CUsuario: number | null;
  Descripcion: string;
  EsLider: any;
  Fecha: Date | null;
}
export interface IAbcCultivo {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Scta: string;
}
export interface IAbcEmpleado {
  Clave: number;
  CPuesto: number | null;
  CSucursal: number | null;
  CTiponomi: number | null;
  CUsuario: number | null;
  Curp: string;
  Descripcion: string;
  DuracionTurno: any;
  EsLiderDeCuadrilla: any;
  Fecha: Date | null;
  Rfc: string;
  TipoSangre: string;
}
export interface IAbcLocalidade {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Scta: string;
}
export interface IAbcNomina {
  Clave: number;
  CDiaDescanso: string;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Scta: string;
}
export interface IAbcPai {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcParcela {
  Clave: number;
  CUsuario: number | null;
  CostoAcumulado: any;
  Descripcion: string;
  Disponible: any;
  Fecha: Date | null;
  Hectareas: any;
  Ocupado: any;
}
export interface IAbcPresentacionSat {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcProducto {
  Clave: number;
  CPresentacion: number | null;
  CUnidadme: number | null;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcProveedore {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Rfc: string;
  Scta: string;
}
export interface IAbcPuesto {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcSucursal {
  Clave: number;
  CLocalidad: string;
  CPais: string;
  CUsuario: number | null;
  Descripcion: string;
  Domicilio: string;
  Fecha: Date | null;
}
export interface IAbcTemporadum {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
  Scta: string;
}
export interface IAbcUnidadMedidaSat {
  Clave: number;
  CUsuario: number | null;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IAbcUsuario {
  Clave: number;
  Activo: any;
  CEmpleado: number | null;
  CUsuario: number | null;
  Contra: string;
  Descripcion: string;
  Fecha: Date | null;
}
export interface IMaestro {
  NumCuenta: number;
  Abono1: any;
  Abono10: any;
  Abono11: any;
  Abono12: any;
  Abono13: any;
  Abono2: any;
  Abono3: any;
  Abono4: any;
  Abono5: any;
  Abono6: any;
  Abono7: any;
  Abono8: any;
  Abono9: any;
  Cargo1: any;
  Cargo10: any;
  Cargo11: any;
  Cargo12: any;
  Cargo13: any;
  Cargo2: any;
  Cargo3: any;
  Cargo4: any;
  Cargo5: any;
  Cargo6: any;
  Cargo7: any;
  Cargo8: any;
  Cargo9: any;
  Naturaleza: string;
  Nombre: string;
  Permite: any;
  SaldoInicial: any;
}
export interface IMdActividadesAAsignar {
  Folio: number;
  CActividad: number | null;
  CCuadrilla: number | null;
  CCultivo: number | null;
  CEmpleado: number | null;
  CUsuario: number | null;
  Fecha: Date | null;
}
export interface IMdActividadesPorCultivo {
  Folio: number;
  CActividad: number | null;
  CCultivo: number | null;
  CUsuario: number | null;
  Fecha: Date | null;
}
export interface IMdCompra {
  Folio: number;
  CBodega: number | null;
  CProducto: number | null;
  CProveedor: number | null;
  CUsuario: number | null;
  Cantidad: any;
  EsOrdenDeCompra: any;
  Fecha: Date | null;
  Iva: any;
  Subtotal: any;
  Total: any;
}
export interface IMdCultivosPorParcela {
  Folio: number;
  CCultivo: number | null;
  CParcela: number | null;
  CUsuario: number | null;
  EspacioOcupar: string;
  Fecha: Date | null;
}
export interface IMdGasto {
  Folio: number;
  CAcreedor: number | null;
  CBodega: number | null;
  CProducto: number | null;
  CUsuario: number | null;
  Cantidad: any;
  Fecha: Date | null;
  Iva: any;
  Subtotal: any;
  Total: any;
}
export interface IMdInventario {
  Folio: number;
  CBodega: number | null;
  CProducto: number | null;
  CUsuario: number | null;
  Cantidad: any;
  EntradaDeInventarios: any;
  Fecha: Date | null;
  SalidaDeInventarios: any;
}
export interface IMdNomina {
  Folio: number;
  CEmpleado: number | null;
  CTiponomi: number | null;
  CUsuario: number | null;
  DatSdoDiario: any;
  DedAportacionVoluntaria: any;
  DedCajaDeAhorro: any;
  DedCesantiaYVejez: any;
  DedExcesoTrabajador: any;
  DedIncapacidad: any;
  DedInfonavit: any;
  DedIsr: any;
  DedPrestamosEmpresa: any;
  DedSeguridadSocial: any;
  DiasTrabajados: string;
  DomingoLaborado: any;
  Fecha: Date | null;
  FechaFinal: Date | null;
  FechaInicial: Date | null;
  PagoNeto: any;
  PerAguinaldo: any;
  PerCajaAhorro: any;
  PerPrimaDominical: any;
  PerPrimaVacacional: any;
  PerPuntualidad: any;
  PerSubsidioEmpleo: any;
  PerSueldosYSalarios: any;
  PerVacaciones: any;
  PerVales: any;
  TotDed: any;
  TotPer: any;
}
export interface IMdOrdenCompra {
  Folio: number;
  CProducto: number | null;
  CProveedor: number | null;
  CUsuario: number | null;
  Cantidad: any;
  Fecha: Date | null;
  Iva: any;
  Subtotal: any;
  Total: any;
}
export interface IMdPolizasDiario {
  Folio: number;
  Abono: any;
  CUsuario: number | null;
  Cargo: any;
  Concepto: string;
  CtaContable: number | null;
  Fecha: Date | null;
}
export interface IMdProcesoDeLosCultivo {
  Folio: number;
  AumentoODisminucionDeCosto: any;
  CCentcost: number | null;
  CUsuario: number | null;
  CostoAcumulado: any;
  CostoAumentado: any;
  CostoDisminuido: any;
  EsPerdida: any;
  EsReclasificacion: any;
  Fecha: Date | null;
}
export interface IMdReporteDiario {
  Folio: number;
  CUsuario: number | null;
  DescripcionDelDia: string;
  Fecha: Date | null;
  HuboIncidente: any;
  QuedaronActividadesPendientes: any;
  TodasActividadesCompletadas: any;
}
export interface IMdVenta {
  Folio: number;
  CCliente: number | null;
  CProducto: number | null;
  CUsuario: number | null;
  Cantidad: string;
  Fecha: Date | null;
  Iva: any;
  Subtotal: any;
  Total: any;
}
export interface IPoliza {
  NumPoliza: string;
  Concepto: string;
  FechaPoli: Date;
  Importe: any;
  NumCuenta: number;
  OsirisF: string;
  OsirisI: string;
  TipoAsiento: string;
}
