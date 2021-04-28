using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// Descripción breve de Resultado
/// </summary>
/// 
namespace GestionBaseDatos
{
    public class Resultado
    {
        string mensaje;
        DataSet resultados;
        bool error;

        public Resultado()
        {
            this.mensaje = string.Empty;
            this.resultados = null;
            this.error = false;
        }

        public Resultado(DataSet resultados, string mensaje, bool error)
        {
            this.resultados = resultados;
            this.mensaje = mensaje;
            this.error = error;
        }

        public string Mensaje
        {
            set { mensaje = value; }
            get { return mensaje; }
        }

        public bool Error
        {
            set { error = value; }
            get { return error; }
        }

        public DataSet Resultados
        {
            set { resultados = value; }
            get { return resultados; }
        }

        public bool existTable(string nombre)
        {
            bool resp = false;
            try
            {
                if (this.Resultados.Tables[nombre] == null)
                    resp = false;
                else
                    resp = true;
            }
            catch (Exception ex) { }
            return resp;
        }

        public DataTable getTable(string nombre)
        {
            DataTable tResultado = null;
            if (this.Resultados.Tables[nombre] == null)
                throw new Exception("No existe un conjunto de resultados con el nombre: " + nombre);

            tResultado = this.Resultados.Tables[nombre];
            return tResultado;
        }

        public void addTable(DataTable tResultado)
        {
            if (tResultado == null)
                throw new Exception("No se puede agregar un conjunto de resultados vacio");
            this.Resultados.Tables.Add(tResultado);
        }

        public bool tablaEsVacia(string nombre)
        {
            bool resp = false;
            try
            {
                resp = this.Resultados.Tables[nombre].Rows.Count > 0 ? false : true;
            }
            catch (Exception ex) { }
            return resp;
        }

        public bool ResultadoEsVacio()
        {
            bool resp = false;
            try
            {
                resp = this.Resultados.Tables.Count > 0 ? false : true;
            }
            catch (Exception ex) { }
            return resp;
        }

        public DataTable ObtenerTablaParaLista(string nombre)
        {
            if (existTable(nombre))
            {
                return this.resultados.Tables[nombre];
            }
            else
            {
                DataTable temp = new DataTable(nombre);
                temp.Columns.Add("Codigo");
                temp.Columns.Add("Descripcion");
                temp.Columns.Add("Selected");
                return temp;
            }
        }
    }
}