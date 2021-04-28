using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de FuncionesGlobal
/// </summary>
public class FuncionesGlobal
{
    public FuncionesGlobal()
    {
       
    }

    public string JavaScriptMensaje(string Mensaje)
    {
        Mensaje = Mensaje.Replace("'", "");
        Mensaje = Mensaje.Replace("\n", "");
        Mensaje = Mensaje.Replace("\r", "");
        return "<script type='text/javascript' language='javascript'>window.alert('" + Mensaje + "')</script>";
    }
}