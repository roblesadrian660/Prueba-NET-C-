function ObtenerXmlRegistro(sUrlxml) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.open("GET", sUrlxml, false);
    xmlhttp.send();
    xml = xmlhttp.responseXML;
    return xml;
}

function marcarCamposRequeridosXml(xmlDoc) {
    var sRequerido = "Requerido";
    if (xmlDoc != undefined && xmlDoc != null && xmlDoc != "" && xmlDoc.childNodes != undefined && xmlDoc.childNodes != null && xmlDoc.childNodes.length > 0) {
        var lstCampos = null;
        var bRequerido = null;

        lstCampos = xmlDoc.getElementsByTagName("Campos");
        if (lstCampos != null) {
            for (var k = 0; k < lstCampos.length; k++) {

                var objAtributoIdentificador = lstCampos[k].attributes.getNamedItem("Identificador");
                var objAtributoRequerido = lstCampos[k].attributes.getNamedItem("Requerido");

                if (objAtributoRequerido !== null && objAtributoIdentificador !== null && eval(objAtributoRequerido.value.replace(".checked", "")) != null) {
                    bRequerido = (eval(objAtributoRequerido.value) == true)
                    if (bRequerido) {
                        oControl = document.getElementById(objAtributoIdentificador.value + sRequerido);
                        if (oControl != null) {
                            $(oControl).show();
                            $(oControl).text("*");
                            $(oControl).attr("title", "Campo Requerido");
                            $(oControl).css("color", "red");
                        }
                    }
                    else {
                        oControl = document.getElementById(objAtributoIdentificador.value + sRequerido);
                        if (oControl != null) {
                            $(oControl).hide();
                        }
                    }
                }
            }
        }

    }
    else {
        alert("ERROR: Método marcarCamposRequeridos():\n" + "No se pudo leer el xml del registro" + "\nArchivo: FuncionesGlobales.js");
    }
}

function ValidarFormularioXml(objXmlRegistro) {
    var lstCampos = null;
    var bRequerido = null;
    var vCampos = new Array();
    var iIndexArray = -1;
    var sCampo = "";
    var sMensaje = "";
    var sTipoControl = "";
    var sValor = "";
    var sControl = "";
    var lstObjetos;
    if (objXmlRegistro != undefined && objXmlRegistro != null && objXmlRegistro.childNodes != undefined && objXmlRegistro.childNodes != null && objXmlRegistro.childNodes.length > 0) {
        try {
            lstCampos = objXmlRegistro.getElementsByTagName("Campos");
            if (lstCampos != null) {
                for (var k = 0; k < lstCampos.length; k++) {

                    bRequerido = (eval(lstCampos[k].attributes.getNamedItem("Requerido") != undefined ? lstCampos[k].attributes.getNamedItem("Requerido").value : false) == true)
                    sControl = lstCampos[k].attributes.getNamedItem("Control") != undefined ? lstCampos[k].attributes.getNamedItem("Control").value : "";
                    sTipoControl = lstCampos[k].attributes.getNamedItem("TipoControl") != undefined ? lstCampos[k].attributes.getNamedItem("TipoControl").value : "";
                    sCampo = lstCampos[k].attributes.getNamedItem("Identificador") != undefined ? lstCampos[k].attributes.getNamedItem("Identificador").value : "";
                    sMensaje = lstCampos[k].attributes.getNamedItem("Mensaje") != undefined ? lstCampos[k].attributes.getNamedItem("Mensaje").value : "";
                    sTipoValidacion = lstCampos[k].attributes.getNamedItem("TipoValor") != undefined ? lstCampos[k].attributes.getNamedItem("TipoValor").value : "";
                    sCodigo = lstCampos[k].attributes.getNamedItem("Codigo") != undefined ? lstCampos[k].attributes.getNamedItem("Codigo").value : "";

                    if (sTipoControl.toLowerCase() === "kendo") {
                        var ObjKendo = null;
                        var sValor = "";
                        switch (sControl.toLowerCase()) {
                            case "kendomultiselect":
                                ObjKendo = $("#" + sCampo).data("kendoMultiSelect");
                                sValor = ObjKendo != null ? ObjKendo.value().toString() : "";
                                break;
                            case "kendodropdownlist":
                                ObjKendo = $("#" + sCampo).data("kendoDropDownList");
                                sValor = ObjKendo != null ? ObjKendo.value().toString() : "";
                                break;
                            case "kendocombobox":
                                ObjKendo = $("#" + sCampo).data("kendoComboBox");
                                sValor = ObjKendo != null ? ObjKendo.value().toString() : "";
                                break;
                            case "kendonumerictextbox":
                                ObjKendo = $("#" + sCampo).data("kendoNumericTextBox");
                                sValor = ObjKendo != null && ObjKendo.value() != null ? ObjKendo.value().toString() : "";
                                break;
                            case "kendogrid":
                                ObjKendo = $("#" + sCampo).data("kendoGrid");
                                var vItems = ObjKendo.items();
                                sValor = vItems.length > 0 ? "x" : "";
                                break;
                        }
                        if (ObjKendo !== null) {
                            vCampos[++iIndexArray] = new Array(ObjKendo, sMensaje, sValor, sTipoValidacion, sTipoControl, bRequerido);
                        }
                    } else {
                        if (sControl.toLowerCase() !== "radio" && sTipoValidacion.toLowerCase() !== "seleccionmultiple") {
                            if (document.getElementById(sCampo) !== null && ($("#" + sCampo).is(':visible') || sControl.toLowerCase() == "textareaenriquecido")) {

                                sValor = document.getElementById(sCampo).value;

                                vCampos[++iIndexArray] = new Array(document.getElementById(sCampo), sMensaje, sValor, sTipoValidacion, sTipoControl, bRequerido);
                            }
                        } else {
                            lstObjetos = document.getElementsByName(sCampo);
                            if (lstObjetos !== null) {
                                if ($("#" + lstObjetos[0].id).is(':visible')) {
                                    vCampos[++iIndexArray] = new Array(lstObjetos, sMensaje, sValor, sTipoValidacion, sTipoControl, bRequerido);
                                }
                            }
                        }
                    }

                }
            }
            if (!validar(vCampos)) {
                return false;
            }
            return true;

        } catch (e) {
            alert("ERROR: Método ValidarFormularioXml():\n" + e.message + "\nArchivo: FuncionesGlobales.js");
            return false;
        }
    }
    else {
        alert("ERROR: Método ValidarFormularioXml():\n" + "No se pudo leer el xml del registro" + "\nArchivo: FuncionesGlobales.js");
    }
}

function validar(valores) {
    var codidosValidacion = new Array();

    codidosValidacion["FECHA"] = "^(?:(?:0?[1-9]|1\\d|2[0-8])(\\/|-)(?:0?[1-9]|1[0-2]))(\\/|-)(?:[1-9]\\d\\d\\d|\\d[1-9]\\d\\d|\\d\\d[1-9]\\d|\\d\\d\\d[1-9])$|^(?:(?:31(\\/|-)(?:0?[13578]|1[02]))|(?:(?:29|30)(\\/|-)(?:0?[1,3-9]|1[0-2])))(\\/|-)(?:[1-9]\\d\\d\\d|\d[1-9]\\d\\d|\\d\\d[1-9]\\d|\\d\\d\\d[1-9])$|^(29(\\/|-)0?2)(\\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\\d\\d)?(?:0[48]|[2468][048]|[13579][26]))$";
    codidosValidacion["TEXTO"] = "\\w+";
    codidosValidacion["ENTERO"] = "^(\\+?|\\-)\\d+$";
    codidosValidacion["REAL"] = "^(\\+?|\\-)\\d+\\.?\\d*$";
    codidosValidacion["Solo_Numero"] = "^\\d+$";
    codidosValidacion["HoraMilitar"] = "^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])?(:)?([0-5][0-9])$"; //Validar Hora en formato 24H
    codidosValidacion["Hora"] = "^(0[1-9]|1[0-2]):([0-5][0-9])?(:)?([0-5][0-9])$"; //Validar Hora

    var r = true;
    var lstObjRadio = null;

    for (i = 0; i < valores.length; i++) {
        var patron = codidosValidacion[valores[i][3]];
        var cadena = valores[i][2];

        switch (valores[i][3].toLowerCase()) {
            case "fecha":
                var cadenasplit = cadena.split(" ");
                r = testear(patron, cadenasplit[0]);
                break;
            case "fechahora"://formato DD/MM/AAAA HH:MM/:SS
                var cadenasplit = cadena.split(" ");
                r = testear(codidosValidacion["FECHA"], cadenasplit[0]);
                if (r) {
                    r = testear(codidosValidacion["HoraMilitar"], cadenasplit[1]);
                }
                break;
            case "radio":
            case "seleccionmultiple":
                lstObjRadio = valores[i][0];
                r = false;
                if (lstObjRadio != null) {
                    valores[i][0] = lstObjRadio[0];
                    for (var j = 0; j < lstObjRadio.length; j++) {
                        if (lstObjRadio[j].checked) {
                            r = true;
                        }
                    }
                }
                break;
            default:
                r = testear(patron, cadena);
                break;
        }

        if (!r) {
            if (valores[i][5] || (cadena != "" && cadena != null)) {
                switch (valores[i][3].toLowerCase()) {
                    case "fechahora":
                        alert("El campo '" + valores[i][1].toLowerCase() + "' no cumple con el formato de " + valores[i][3].toLowerCase() + " (DD/MM/AAAA HH:MM)");
                        break;
                    case "radio":
                    case "seleccionmultiple":
                        alert("No se ha seleccionado un valor para el campo '" + valores[i][1] + "', por favor verifique.");
                        break;
                    default:
                        alert("El campo '" + valores[i][1] + "' no cumple con el formato [" + valores[i][3] + "]");
                        break;
                }
            }
        }
    }
    return r;
}

function testear(p, c) {
    try {
        var patron = new RegExp(p, "gi");
        return patron.test(c);
    } catch (e) {
        alert("ERROR: ValidarFormularioXml() [ " + e.name + " - " + e.message + " ] \nArchivo: FuncionesGlobales.js");
    }
}