using Dapper;
using MISA.Core.Interface.Repository;
using MySqlConnector;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;

namespace MISA.Infrastructure.Repository
{
    /// <summary>
    /// Repository dùng chung
    /// </summary>
    /// <typeparam name="MISAEntity"></typeparam>
    /// CreatedBy: KDLong 27/04/2021
    public class BaseRepository<MISAEntity> : IBaseRepository<MISAEntity> where MISAEntity : class
    {
        #region prop
        string tableName = typeof(MISAEntity).Name;
        //protected string connectionString = "" +
        //   "Host = 47.241.69.179;" +
        //   "Port = 3306;" +
        //   "Database = MF822_Import_KDLong;" +
        //   "User Id= dev;" +
        //   "Password = 12345678;";
        protected string connectionString = "Host=localhost;Port=5432;Username=postgres;Password=27112000;Database=postgres";
        protected IDbConnection dbConnection;
        #endregion

        #region Method
        /// <summary>
        /// Xóa một thực thể theo Id
        /// </summary>
        /// <param name="entityId">Id</param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// CreatedBy KDLong 27/04/2021
        public int Delete(Guid entityId)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"@_{tableName}_id", entityId);
                var rowsAffect = dbConnection.QueryFirstOrDefault<int>($"proc_delete_{tableName}", param: parameters, commandType: CommandType.StoredProcedure);
                return rowsAffect;
            }
        }
        /// <summary>
        /// Lấy tất cả bản ghi
        /// </summary>
        /// <returns>Tất cả bản ghi</returns>
        /// CreatedBy KDLong 27/04/2021
        //public IEnumerable<MISAEntity> GetAll()
        //{
        //    using (dbConnection = new NpgsqlConnection(connectionString))
        //    {
        //        var entities = dbConnection.Query<MISAEntity>($"Proc_Get{tableName}s", commandType: CommandType.StoredProcedure);
        //        return entities;
        //    }
        //}
        public IEnumerable<MISAEntity> GetAll()
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                var entities = dbConnection.Query<MISAEntity>($"proc_get_{tableName}s", commandType: CommandType.StoredProcedure);
                return entities;
            }
        }
        
      

        /// <summary>
        /// Lấy bản ghi theo Id
        /// </summary>
        /// <param name="entityId">Id</param>
        /// <returns>Bản ghi</returns>
        /// CreatedBy KDLong 27/04/2021
        public MISAEntity GetById(Guid entityId)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"@_{tableName}_id", entityId);
                var entity = dbConnection.QueryFirstOrDefault<MISAEntity>($"proc_get_{tableName}_by_id", param: parameters, commandType: CommandType.StoredProcedure);
                return entity;
            }
        }
        /// <summary>
        /// Thêm mới 1 bản ghi
        /// </summary>
        /// <param name="entity">Bản ghi cần thêm mới</param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// CreatedBy KDLong 27/04/2021
        public int Insert(MISAEntity entity)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                var props = typeof(MISAEntity).GetProperties();
                DynamicParameters parameters = new DynamicParameters();
                foreach (var prop in props)
                {
                    parameters.Add($"@_{prop.Name}", prop.GetValue(entity));
                }
                var rowsAffect = dbConnection.QueryFirstOrDefault<int>($"proc_insert_{tableName}", param: parameters, commandType: CommandType.StoredProcedure);
                return rowsAffect;
            }
        }
        /// <summary>
        /// Cập nhật 1 bản ghi
        /// </summary>
        /// <param name="entity">Bản ghi cần cập nhật</param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// CreatedBy KDLong 27/04/2021
        public int Update(MISAEntity entity)
        {
            using (dbConnection = new NpgsqlConnection(connectionString))
            {
                var props = typeof(MISAEntity).GetProperties();
                DynamicParameters parameters = new DynamicParameters();
                foreach( var prop in props)
                {
                    parameters.Add($"@_{prop.Name}", prop.GetValue(entity));
                }
                var rowsAffect = dbConnection.QueryFirstOrDefault<int>($"proc_update_{tableName}", param: parameters, commandType: CommandType.StoredProcedure);
                return rowsAffect;
            }
        }
        #endregion

        
    }
}
