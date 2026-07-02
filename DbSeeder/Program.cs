using System;
using MySqlConnector;

namespace FixAdmin
{
    class Program
    {
        static void Main(string[] args)
        {
            // ⚠️ Change this password to match YOUR MySQL root password
            string connectionString = "Server=localhost;Database=WholesaleDB;User=root;Password=root;Port=3306;AllowUserVariables=True";
            
            string correctHash = BCrypt.Net.BCrypt.HashPassword("Test@123");

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                using (var command = new MySqlCommand("UPDATE Users SET PasswordHash = @hash WHERE Role = 'Admin'", connection))
                {
                    command.Parameters.AddWithValue("@hash", correctHash);
                    int rows = command.ExecuteNonQuery();
                    Console.WriteLine($"Updated {rows} admin(s) with correct password hash.");
                }
            }
        }
    }
}
