using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de EventosCs
/// </summary>
public class EventosCs
{
    // Cliente
    public string sAccion { get; set; }
    public string sXmlDatos { get; set; }


    // Servidor
    public string sObjJson { get; set; }
    public bool bError { get; set; }
    public string sMensaje { get; set; }
    public string sResultado { get; set; }
}