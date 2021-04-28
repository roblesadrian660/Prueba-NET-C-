using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Parametros
/// </summary>
/// 
namespace GestionBaseDatos
{
    public class Parametros
    {
        private string nombreProcedimiento;

        ArrayList nombreParametros = new ArrayList();
        ArrayList parametros = new ArrayList();

        public string Nombre
        {
            get { return this.nombreProcedimiento; }
            set { nombreProcedimiento = value; }
        }

        public Parametros()
        {
            nombreProcedimiento = "";
        }

        public Parametros(string sValor)
        {
            this.nombreProcedimiento = sValor;
        }
        public void agregarParametro(atributosParametros p)
        {
            parametros.Add(p);
            nombreParametros.Add(p.nombre);
        }
        public atributosParametros getParametro(int index)
        {
            return (atributosParametros)parametros[index];
        }
        public atributosParametros getParametro(string nom_p)
        {
            int index = nombreParametros.IndexOf(nom_p);
            return (atributosParametros)parametros[index];
        }
        public ArrayList getParametro()
        {
            return parametros;
        }
        public void quitarParametro(int index)
        {
            parametros.RemoveAt(index);
        }
        public void quitarParametro()
        {
            parametros.Clear();
        }
        public int getTotalParametros()
        {
            return parametros.Count;
        }
    }
}