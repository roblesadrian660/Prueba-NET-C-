using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de atributosParametros
/// </summary>
/// 
namespace GestionBaseDatos
{
    public class atributosParametros
    {

        public ParameterDirection direccion { get; set; }
        public DbType tipo { get; set; }
        public string nombre { get; set; }
        public object valor { get; set; }
        public int tamano { get; set; }

        public atributosParametros(string nombre, DbType tipo, object valor, ParameterDirection direccion)
        {
            this.nombre = nombre;
            this.tipo = tipo;
            this.direccion = direccion;
            this.valor = valor;
            this.tamano = 0;
        }

        public atributosParametros(string nombre, DbType tipo, object valor)
        {
            this.nombre = nombre;
            this.tipo = tipo;
            this.valor = valor;
        }
    }
}