//***************************************************************************************************************************************//
// Author           : Adrian Andres Robles De Avila                                                                                      //
// Created          : 2019-Obt-14                                                                                                        //
//                                                                                                                                       //
// Description      : Ventana para realizar todas las operaciones del Maestro de usuario                                                 //
//                                                                                                                                       //
// Copyright        :                                                                                                                    //
//***************************************************************************************************************************************//

var gObjComboUsuario = null;
var gObjComboCargo = null;
var gObjComboTipoIdentificacion = null;
var gObjSwitchActivo = null;

var sObjPrimerNombre = "";
var sObjSegundoNombre = "";
var sObjPrimerApellido = "";
var sObjSegundoApellido = "";
var sObjNombre = "";

var sUrlXml = 'MaestroUsuario.xml';
var XmlRegistro = null;

function inicializar() {
    //Se Obtiene el Xml del Registro
    XmlRegistro = ObtenerXmlRegistro(sUrlXml);
    CargarControles();
    marcarCamposRequeridosXml(XmlRegistro);
};


function ArmarXmlGuardar() {
    var sXml = '';

    sXml = '<parameter>';
    sXml += '<row id= "NombreCompleto" value="' + sObjNombre + '"/>';
    sXml += '</parameter>'

    return sXml;
}

function obtenerDatosSelect(sAccion, sDatos = "", sOpcion = "", sXml = "") {
    var objEventoCs = new Object();
    var objJson = new Object();

    objEventoCs.sAccion = sAccion;

    if (sDatos !== "" && sDatos) {
        objEventoCs.sXmlDatos = sDatos;
    }

    if (sOpcion !== "" && sOpcion) {
        objJson.sOpcion = sOpcion;
    }


    objEventoCs.sObjJson = JSON.stringify(objJson);
    return "{\"objEventosCs\":" + JSON.stringify(objEventoCs) + "}";
}

function procesarDataCombos(objJsonResultado) {
    var lstDatos = [];
    if (objJsonResultado && objJsonResultado !== null) {
        if (objJsonResultado.bError) {
            //MostrarMensaje("error", objJsonResultado.sMensaje);
        } else {
            if (objJsonResultado.sDatos) {
                lstDatos = jQuery.parseJSON(objJsonResultado.sDatos);
            }
        }
    }
    return lstDatos;
}

//======================================================================================================================
// Descripcion: Inicio Configuracion / Maestro de Usuarios

//Fecha: 2019/10/14
//Descripcion: Inicializa los controles del Maestro de Usuarios
function CargarControles() {

    var objResult = $.parseJSON($("#Hidden_Datos").val());
    if (objResult != null && objResult != undefined) {
        if (objResult.TiposDodumento != undefined) {
            cargarComboTipoIdentificacion(objResult.TiposDodumento);
        } else {
            cargarComboTipoIdentificacion([]);
        }
        
        if (objResult.Cargos != undefined) {
            cargarComboCargo(objResult.Cargos);
        } else {
            cargarComboCargo([]);
        }
    }

    if (gObjComboUsuario == null) {

        var dataSourceUsuario = {
            type: "json",
            serverFiltering: true,
            transport: {
                read:
                function (json_Data) {
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "MaestroUsuario.aspx/sEventosCs",
                        dataTextField: 'Nombre',
                        dataValueField: "Codigo",
                        data: obtenerDatosSelect("ConsultarUsuarioCreacion", $("#Combox_Usuario").data("kendoComboBox").text(), "CargarComboUsuario"),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var objJsonResultado = jQuery.parseJSON(data.d)
                            var objJsonData = procesarDataCombos(objJsonResultado);
                            json_Data.success(objJsonData);
                        }
                        , error: function (data) {
                            alert(data);
                        }
                    });
                }
            }
        };

        gObjComboUsuario = $("#Combox_Usuario").kendoComboBox({
            dataTextField: 'Nombre',
            dataValueField: "Codigo",
            filter: "contains",
            minLength: 3,
            placeholder: "Seleccione...",
            dataSource: dataSourceUsuario,
        }).data("kendoComboBox");
    }

}

//Fecha: 2019/10/14
//Descripcion: Crear combo de los Cargo de los usuarios
function cargarComboCargo(sData) {

    if (gObjComboCargo == null) {
        gObjComboCargo = $("#txtCargo").kendoComboBox({
            animation: false,
            dataTextField: 'Nombre',
            dataValueField: "Codigo",
            dataSource: sData,
            placeholder: "Seleccione..."
        }).data("kendoComboBox");
    }
}

//Fecha: 2019/10/19
//Descripcion: Crear Switch si el usuario esta activo.
function cargarSwitchActivo(bdata) {

    if (gObjSwitchActivo == null) {
        gObjSwitchActivo = $("#txtActivo").kendoSwitch({
            checked: bdata
        }
        );
    }
}


//Fecha: 2019/10/14
//Descripcion: Crear combo de los tipos de identificacion de los usuarios
function cargarComboTipoIdentificacion(sData) {
    if (gObjComboTipoIdentificacion == null) {
        gObjComboTipoIdentificacion = $("#txtTipoIdentificacion").kendoComboBox({
            animation: false,
            dataTextField: 'Nombre',
            dataValueField: "Codigo",
            dataSource: sData,
            placeholder: "Seleccione..."
        }).data("kendoComboBox");
    }
}

//Fecha: 2019/10/14
//Descripcion: Funcion para llenar el input del nombre completo del usuario
function nombreCompleto(input) {

    var sValor = $(input.id).val();

    switch (input.id) {
        case "txtPrimerNombre":
            sObjPrimerNombre = sValor;
            break;
        case "txtSegundoNombre":
            sObjSegundoNombre = sValor;
            break;
        case "txtPrimerApellido":
            sObjPrimerApellido = sValor;
            break;
        case "txtSegundoApellido":
            sObjSegundoApellido = sValor;
            break;
    }

    sObjNombre = $("#txtPrimerNombre").val() + " " + $("#txtSegundoNombre").val() + " " + $("#txtPrimerApellido").val() + " " + $("#txtSegundoApellido").val()
    $("#txtNombre").val(sObjNombre);
}

function GuardarUsuario() {
    //$.ajax({
    //    async: false,
    //    type: "POST",
    //    url: "MaestroUsuario.aspx/sEventosCs",
    //    data: obtenerDatosSelect("GestionUsuario", ArmarXmlGuardar(), "GuardarUsuario"),
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        var objJsonResultado = jQuery.parseJSON(data.d)
    //    }
    //    , error: function (data) {
    //        alert(data);
    //    }
    //});
    ValidarFormularioXml(XmlRegistro);
}

//Fin configuracion: Maestro de Usuarios
//========================================================================================================================

