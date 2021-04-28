/*Variables globales*/
var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var tabCounter = 2;

/// <summary>
/// Configurar el tamaña del area de trabajo
/// </summary>
function onload() {
    var heigth = ((screen.height * 80) / 100) - 50;
    $("#iframe_Inicio").height("100%");
    $("#content").height(heigth + 25);
    $("#content").attr("overflow", "scroll");

    inicializarTabs();
}


/// <summary>
///Inicialización del componente de las pestañas
/// </summary>
function inicializarTabs() {
    var tabTitle = $("#tab_title"),
        tabContent = $("#tab_content");

    var tabs = $("#tabs").tabs();

    // close icon: removing the tab on click
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
        tabCounter--;
    });

    tabs.bind("keyup", function (event) {
        if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
            var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
        }
    });
}


/// <summary>
///Redireccionar a la pagina invocada y gestionar las pestañas
/// Modificaciones:
/// 20170206 kperez: se quitan las comillas simples de la querystring del sToken de la session.
/// </summary>
function redireccionar(sDireccion, sTexto, stab, Op) {
    if (Op == "Imp") {
        var sUrl = sDireccion;
    } else {
        var sUrl = sDireccion + "?sToken=" + $("#Hidden_Url").val();
    }


    /*Validar la configuración de las pestañas*/
    var bTabs = $("#ASPxHiddenField_Maqueta").val();

    if ((bTabs === 'True' || bTabs === 'true') && stab === 'TabSi') {
        agregarTab(sTexto, sUrl);
    } else {


        var tabs = $("#tabs").tabs();
        tabs.tabs({ selected: 0 });
        document.getElementById('a_bienvenida').innerText = sTexto;
        document.getElementById('iframe_Inicio').src = sUrl;
        var heigth = ((screen.height * 80) / 100) - 40;
        $("#iframe_Inicio").height(heigth);
    }
}


/// <summary>
///Agregar un nuevo Tab
/// </summary>
function agregarTab(sTitulo, sDireccion) {
    if (tabCounter <= 11) {
        var heigth = ((screen.height * 80) / 100) - 70;
        var tabs = $("#tabs").tabs();
        var label = sTitulo || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
            tabContentHtml = '<iframe id="' + id + '" frameborder="0" height="' + heigth + 'px" width="100%" src="' + sDireccion + '"></iframe>' || "Tab " + tabCounter + " content.";

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
        tabs.tabs("refresh");
        if (tabCounter > 1) {
            count = tabCounter - 1;
        } else { count = tabCounter; }
        tabs.tabs({ selected: count });
        tabCounter++;
    } else {
        MensajeInformation(false, 'SIOS', 'El número maxima de pestañas abiertas permitas es 10', '');
    }

}



/// <summary>
///Abrir una pagina
/// </summary>
function abrirInterfaz(sInterfaz, sCarpeta, sTexto, stab, Op) {
    var sDireccion = "";
    if (sInterfaz == "Inicio.aspx") {
        sDireccion = sInterfaz;
    } else {
        sDireccion = sCarpeta + '/' + sInterfaz;
    }
    redireccionar(sDireccion, sTexto, stab, Op);
}
