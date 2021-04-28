using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Data.Common;
/// <summary>
/// Descripción breve de Conexion
/// </summary>
/// 

namespace GestionBaseDatos
{
    public class Conexion
    {

        #region Variables
        private DbProviderFactory dbFactory = null;
        private IDbConnection dbConexion = null;
        private IDbCommand dbComando = null;
        private string TABLE_NAME = "table_name";

        #endregion

        #region Inicializacion 
        public Conexion()
        {
            dbFactory = DbProviderFactories.GetFactory(ConfigurationManager.ConnectionStrings["CadenaDeConexion"].ProviderName);
            dbConexion = dbFactory.CreateConnection();

            dbConexion.ConnectionString = ConfigurationManager.ConnectionStrings["CadenaDeConexion"].ConnectionString;
        }
        public Conexion(string webString)
        {
            dbFactory = DbProviderFactories.GetFactory(ConfigurationManager.ConnectionStrings[webString].ProviderName);
            dbConexion = dbFactory.CreateConnection();

            dbConexion.ConnectionString = ConfigurationManager.ConnectionStrings[webString].ConnectionString;
        }
        #endregion

        #region Funciones

        public SqlCommand conexionBD()
        {
            dbConexion.Open();
            dbComando = dbConexion.CreateCommand();

            return (SqlCommand)dbComando;
        }

        public void cerrarConexion()
        {
            if (dbConexion != null)
                dbConexion.Close();
        }
        public Resultado Consultar(string sql)
        {
            Resultado Resultado = null;

            DataSet dataSet = new DataSet();
            SqlDataAdapter adapter = new SqlDataAdapter();

            try
            {
                dbConexion.Open();

                dbComando = dbConexion.CreateCommand();
                dbComando.CommandType = CommandType.Text;

                dbComando.CommandText = sql;
                dbComando.CommandTimeout = 0;
                adapter.SelectCommand = (SqlCommand)dbComando;
                adapter.Fill(dataSet);
                Resultado = crearResult(dataSet, "OK", false);

            }
            catch (Exception ex)
            {
                Resultado = new Resultado(dataSet, ex.Message, true);
            }

            cerrarConexion();
            return Resultado;
        }

        public Resultado Consultar(Parametros Parametros)
        {
            Resultado Resultado = null;

            DataSet dataSet = new DataSet();
            SqlDataAdapter adapter = new SqlDataAdapter();

            try
            {
                dbConexion.Open();
                dbComando = dbConexion.CreateCommand();
                dbComando.CommandType = CommandType.StoredProcedure;
                cargarParametros(dbComando, Parametros);
                dbComando.CommandTimeout = 300;
                adapter.SelectCommand = (SqlCommand)dbComando;
                adapter.Fill(dataSet);
                Resultado = crearResult(dataSet, "OK", false);
            }
            catch (Exception ex)
            {
                Resultado = new Resultado(dataSet, ex.Message, true);
            }

            cerrarConexion();
            return Resultado;
        }

        private void cargarParametros(IDbCommand dbComando, Parametros Parametros)
        {
            dbComando.CommandText = Parametros.Nombre;
            dbComando.Parameters.Clear();
            int tp = Parametros.getTotalParametros();
            for (int i = 0; i < tp; i++)
            {
                DbParameter parametro = (DbParameter)dbComando.CreateParameter();
                parametro.ParameterName = ((atributosParametros)Parametros.getParametro(i)).nombre;
                parametro.DbType = ((atributosParametros)Parametros.getParametro(i)).tipo;
                parametro.Value = ((atributosParametros)Parametros.getParametro(i)).valor;
                parametro.Direction = ((atributosParametros)Parametros.getParametro(i)).direccion;
                if (((atributosParametros)Parametros.getParametro(i)).tamano != 0)
                {
                    parametro.Size = ((atributosParametros)Parametros.getParametro(i)).tamano;
                }

                dbComando.Parameters.Add(parametro);
            }
        }

        private Resultado crearResult(DataSet dataset, string mensaje, bool error)
        {
            Resultado Resultado = new Resultado();
            try
            {
                DataSet dResult = new DataSet("Resultado");
                Resultado.Resultados = dResult;
                Resultado.Mensaje = mensaje;
                Resultado.Error = false;
                foreach (DataTable table in dataset.Tables)
                {
                    crearResultTabla(Resultado, table);
                }
            }
            catch (Exception ex)
            {
                Resultado.Resultados = null;
                Resultado.Mensaje = ex.Message + "\n" + mensaje;
                Resultado.Error = true;
            }
            return Resultado;
        }

        private void crearResultTabla(Resultado Resultado, DataTable tResult)
        {
            if (tResult.Rows.Count > 0)
            {
                string columna = "";
                if (tResult.Columns.Contains(TABLE_NAME))
                {
                    columna = tResult.Rows[0][TABLE_NAME].ToString();
                }
                else
                {
                    columna = "default";
                }

                DataTable tabla = new DataTable(columna);
                try
                {
                    if (tResult.Columns.Contains(TABLE_NAME))
                    {
                        tResult.Columns.Remove(TABLE_NAME);
                    }

                    tabla = tResult.Copy();
                    tabla.TableName = columna;
                    Resultado.Resultados.Tables.Add(tabla);

                }
                catch (Exception ex)
                {
                    Resultado.Resultados = null;
                    Resultado.Mensaje = Resultado.Mensaje + "\n" + ex.Message + "[crearTabla]";
                    Resultado.Error = true;
                }

            }

        }
        #endregion
    }
}