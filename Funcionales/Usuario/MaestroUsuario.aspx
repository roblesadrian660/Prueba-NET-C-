<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MaestroUsuario.aspx.cs" Inherits="Funcionales_Usuario_MaestroUsuario" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>

    <link href="../../Assets/lib/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="../../Assets/lib/bootstrap/css/bootstrap.css" rel="stylesheet" />
    <link href="../../Assets/Style/style.css" rel="stylesheet" />
    <link href="../../Assets/lib/Kendo/css/kendo.common.min.css" rel="stylesheet" />
    <link href="../../Assets/lib/Kendo/css/kendo.blueopal.min.css" rel="stylesheet" />
    <link href="../../Assets/lib/Kendo/css/kendo.blueopal.mobile.min.css" rel="stylesheet" />
    <link href="../../Assets/lib/Kendo/css/kendo.dataviz.min.css" rel="stylesheet" />
    <link href="../../Assets/lib/Kendo/css/kendo.dataviz.blueopal.min.css" rel="stylesheet" />
    <link href="../../Assets/lib/Kendo/css/kendo.custom.css" rel="stylesheet" />
    <link href="../../Assets/Style/Principal/Principal.css" rel="stylesheet" />
    <link href="../../Assets/lib/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />

    <script type="text/javascript" src="../../Assets/lib/jquery/jquery.js"></script>
    <script type="text/javascript" src="../../Assets/Scripts/funcionesGlobales.js"></script>
    <script type="text/javascript" src="../../Assets/lib/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="../../Assets/lib/jquery.dcjqaccordion.2.7.js"></script>
    <script type="text/javascript" src="../../Assets/lib/Kendo/js/kendo.all.min.js"></script>
    <script type="text/javascript" src="../../Assets/lib/Kendo/js/kendo.culture.es-ES.js"></script>
    <script type="text/javascript" src="../../Assets/lib/bootstrap-fileupload/bootstrap-fileupload.js"></script>
    <script type="text/javascript" src="../../Assets/lib/bootstrap-switch.js"></script>
    <script type="text/javascript" src="../../Assets/Scripts/json2.js"></script>
    <script type="text/javascript" src="MaestroUsuario.js"></script>

    <style>
        .Margenes {
            padding: 2px;
        }

        .Form1 {
            border-radius: 3px;
            border: #f5f5f5 2px solid;
            padding: 10px;
        }

        .Form2 {
            border-radius: 3px;
            border: #f5f5f5 2px solid;
            padding: 10px;
        }

        .form-control-Kendo {
            width: 100%;
        }
    </style>
</head>
<body onload="inicializar()">
    <div class="Margenes">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Maestro de Usuario</h3>
            </div>
            <div class="panel-body">
                <div class="row ">
                    <div class="col-md-offset-2 col-md-8 ">
                        <div id="Combox_Usuario" class="form-control-Kendo "></div>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-7 Form1">
                        <div class="row">
                            <div class="col-md-12">
                                <label>Nombre Completo</label><span id="txtNombreRequerido"></span>
                                <input id="txtNombre" class="form-control" type="text" readonly />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ">
                                <label for="txtPrimerNombre">Primer Nombre</label><span id="txtPrimerNombreRequerido"></span>
                                <input type="text" class="form-control Requerido" onkeyup="nombreCompleto(this);" id="txtPrimerNombre" placeholder="Nombre" runat="server" />
                            </div>
                            <div class="col-md-6">
                                <label for="txtSegundoNombre">Segundo Nombre</label><span id="txtSegundoNombreRequerido"></span>
                                <input type="text" class="form-control" onkeyup="nombreCompleto(this);" id="txtSegundoNombre" placeholder="Nombre" runat="server" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="txtPrimerApellido">Primer Apellido</label><span id="txtPrimerApellidoRequerido"></span>
                                <input type="text" class="form-control" onkeyup="nombreCompleto(this);" id="txtPrimerApellido" placeholder="Apellido" />
                            </div>
                            <div class="col-md-6">
                                <label for="txtSegundoApellido">Segundo Apellido</label><span id="txtSegundoApellidoRequerido"></span>
                                <input type="text" class="form-control" onkeyup="nombreCompleto(this);" id="txtSegundoApellido" placeholder="Apellido" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="txtCorreo">Correo</label><span id="txtCorreoRequerido"></span>
                                <input type="email" id="txtCorreo" class="form-control" placeholder="Correo" />
                            </div>
                            <div class="col-md-6">
                                <label for="txtCargo">Cargo</label><span id="txtCargoRequerido"></span>
                                <input type="text" id="txtCargo" class="form-control-Kendo" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 Form2">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="txtUsuario">Usuario</label><span id="txtUsuarioRequerido"></span>
                                <input type="text" class="form-control" id="txtUsuario" placeholder="Usuario" />
                            </div>
                            <div class="col-md-6">
                                <label for="txtPassword">Password</label><span id="txtPasswordRequerido"></span>
                                <input type="password" class="form-control" id="txtPassword" placeholder="Password" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="txtIdentificacion">Identificacion</label><span id="txtIdentificacionRequerido"></span>
                                <input type="text" class="form-control" id="txtIdentificacion" placeholder="Usuario" />
                            </div>
                            <div class="col-md-6">
                                <label for="txtTipoIdentificacion">Tipo de Id</label><span id="txtTipoIdentificacionRequerido"></span>
                                <input type="text" class="form-control-Kendo" id="txtTipoIdentificacion" />
                            </div>
                        </div>
                        <div class="row mt">
                            <div class="col-md-6">
                                <label>Firma</label>
                                <div class="fileupload fileupload-new" data-provides="fileupload">
                                    <div class="fileupload-new thumbnail" style="width: 150px; height: 100px;">
                                        <img src="../../Assets/Imagenes/NoImage.png" id="input_Imagen" />
                                    </div>
                                    <div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
                                    <div>
                                        <span class="btn btn-theme02 btn-file">
                                            <span class="fileupload-new"><i class="fa fa-paperclip"></i>Seleccione Imagen</span>
                                            <span class="fileupload-exists"><i class="fa fa-undo"></i>Actualizar</span>
                                            <input type="file" class="default" />
                                        </span>
                                        <a href="#" class="btn btn-theme04 fileupload-exists" data-dismiss="fileupload"><i class="fa fa-trash-o"></i>Eliminar</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="txtEstado">Estado</label><span id="txtEstadoRequerido"></span>
                                <input type="checkbox" class="form-control" id="txtEstado" />
                            </div>
                        </div>
                    </div>

                </div>
                <br />
                <div class="row">
                    <div class="text-center">
                        <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-theme" onclick="GuardarUsuario();">Guardar</button>
                            <button type="button" class="btn btn-theme">Editar</button>
                            <button type="button" class="btn btn-theme">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input id="Hidden_Datos" type="hidden" runat="server" />

</body>
</html>
