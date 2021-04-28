using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using GestionBaseDatos;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Web.Services;
using Newtonsoft.Json.Linq;

public partial class Funcionales_Usuario_MaestroUsuario : System.Web.UI.Page
{
    private Conexion objConexion = new Conexion();

    protected void Page_Load(object sender, EventArgs e)
    {
        InicializarControles();
    }

    private void InicializarControles()
    {
        try
        {
            Resultado Resultado = new Resultado();
            Parametros Parametros = new Parametros("[dbo].[usp_gVentanaSimple]");
            Parametros.agregarParametro(new atributosParametros("@sOpcion", DbType.String, "TipoIdentificacionCargos", System.Data.ParameterDirection.Input));
            Resultado = objConexion.Consultar(Parametros);

            if (!Resultado.Error)
            {
                if (!Resultado.ResultadoEsVacio())
                {
                    Hidden_Datos.Value = JsonConvert.SerializeObject(Resultado.Resultados);
                }
                else
                {
                    Hidden_Datos.Value = "[]";
                }
            }
        }
        catch (Exception e)
        {

        }
    }

    [WebMethod]
    public static string sEventosCs(EventosCs objEventosCs)
    {
        try
        {
            if (objEventosCs != null)
            {
                switch (objEventosCs.sAccion)
                {
                    case "ConsultarUsuarioCreacion":
                        consultarPaqueteSql(objEventosCs);
                        break;
                    case "GestionUsuario":
                        GestionUsuario(objEventosCs);
                        break;

                }
            }
        }
        catch (Exception ex)
        {
            objEventosCs = new EventosCs();
            objEventosCs.bError = true;
            objEventosCs.sMensaje = "Error en sEventosCs():\n" + ex.Message;
        }

        return JsonConvert.SerializeObject(objEventosCs);
    }

    public static void consultarPaqueteSql(EventosCs ObjEventosCs)
    {
        JObject ObjJson = ObjEventosCs.sObjJson != null ? JObject.Parse(ObjEventosCs.sObjJson) : null;
        Conexion objConexion = new Conexion();

        try
        {
            Parametros usp_ConsultarMaestroUsuario = new Parametros("[dbo].[usp_ConsultarMaestroUsuario]");
            usp_ConsultarMaestroUsuario.agregarParametro(new atributosParametros("@sOpcion", DbType.String, ObjJson["sOpcion"], System.Data.ParameterDirection.Input));
            usp_ConsultarMaestroUsuario.agregarParametro(new atributosParametros("@sFiltro", DbType.String, ObjEventosCs.sXmlDatos, System.Data.ParameterDirection.Input));
            Resultado Resultado = objConexion.Consultar(usp_ConsultarMaestroUsuario);

            if(!Resultado.Error)
            {
                if (!Resultado.ResultadoEsVacio())
                {
                }
                else
                {
                }
            }
            else
            {
                throw new Exception("Error en consultarPaqueteSql():\n" + Resultado.Mensaje);
            }

        }
        catch (Exception ex)
        {
            throw new Exception("Error en consultarPaqueteSql():\n" + ex.Message);
        }
    }

    [WebMethod]
    public static void GestionUsuario(EventosCs ObjEventosCs)
    {
        JObject ObjJson = ObjEventosCs.sObjJson != null ? JObject.Parse(ObjEventosCs.sObjJson) : null;
        Conexion objConexion = new Conexion();
        try
        {
            Parametros usp_GestionMaestroUsuario = new Parametros("[dbo].[usp_GestionMaestroUsuario]");
            usp_GestionMaestroUsuario.agregarParametro(new atributosParametros("@sOpcion", DbType.String, ObjJson["sOpcion"], System.Data.ParameterDirection.Input));
            usp_GestionMaestroUsuario.agregarParametro(new atributosParametros("@xml", DbType.String, ObjEventosCs.sXmlDatos, System.Data.ParameterDirection.Input));
            Resultado Resultado = objConexion.Consultar(usp_GestionMaestroUsuario);

            if (!Resultado.Error)
            {
                if (!Resultado.ResultadoEsVacio())
                {
                }
                else
                {
                }
            }
            else
            {
                throw new Exception("Error en consultarPaqueteSql():\n" + Resultado.Mensaje);
            }

        }
        catch (Exception ex)
        {
            throw new Exception("Error en consultarPaqueteSql():\n" + ex.Message);
        }

    }
}