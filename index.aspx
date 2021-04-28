<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Biblioteca</title>
    <link rel="icon" type="image/x-icon" href="Assets/Imagenes/Logo.png" />

    <link href="Assets/Style/bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="Assets/Style/kendo/kendo.blueopal.min.css" rel="stylesheet" />
    <link href="Assets/Style/kendo/kendo.blueopal.mobile.min.css" rel="stylesheet" />
    <link href="Assets/Style/kendo/kendo.common.min.css" rel="stylesheet" />
    <link href="Assets/Style/kendo/kendo.dataviz.blueopal.min.css" rel="stylesheet" />
    <link href="Assets/Style/kendo/kendo.dataviz.min.css" rel="stylesheet" />
    <link href="Assets/Style/login.css" rel="stylesheet" />

    <script src="Assets/Scripts/jquery-3.2.1.min.js"></script>
    <script src="Assets/Scripts/bootstrap/bootstrap.js"></script>
    <script src="Assets/Scripts/Kendo/kendo.all.min.js"></script>
</head>
<body>
    <div class="login-form">
        <h1>Inicio de sesión</h1>

        <div class="txtb">
            <input type="text" id="input_Usuario"/>
            <span data-placeholder="Usuario"></span>
        </div>

        <div class="txtb">
            <input type="password" id="input_Contraseña"/>
            <span data-placeholder="Contraseña"></span>
        </div>

        <input type="button" class="logbtn" value="Iniciar sesión"/>

    </div>

    <script type="text/javascript">
        $(".txtb input").on("focus", function () {
            $(this).addClass("focus");
        });

        $(".txtb input").on("blur", function () {
            if ($(this).val() == "")
                $(this).removeClass("focus");
        });

    </script>
</body>
</html>
