<%@ Page Title="" Language="C#" MasterPageFile="~/Maqueta/MaquetaPrincipal.master" AutoEventWireup="true" CodeFile="Principal.aspx.cs" Inherits="Principal" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <link href="Assets/Style/Principal/Principal.css" rel="stylesheet" />
    <link href="../Assets/vendor/Theme/css/custom-theme/jquery-ui-1.9.2.custom.css" rel="stylesheet" />

    <script  type="text/javascript" src="Assets/vendor/Theme/js/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="Assets/vendor/Theme/js/jquery-ui-1.9.2.custom.js"></script>
    <script type="text/javascript" src="Assets/Scripts/Principal/Principal.js"></script>

    <div style="width: 100%">

        <div id="tabs" style="border-style: none;">
            <ul id="myTab">
                <li><a href="#tabs-1" id="a_bienvenida">Bienvenidos</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span> </li>
            </ul>
            <div id="tabs-1">
                <iframe width="100%" id="iframe_Inicio" frameborder="0" src="Inicio.aspx" scrolling="yes"></iframe>
            </div>
        </div>
    </div>
    
    <input id="ASPxHiddenField_Maqueta" type="hidden" value="true" />
</asp:Content>

