using Newtonsoft.Json;
using System.Text;

namespace Backend.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> Login(string email, string password)
        {
            var payload = new
            {
                API_Action = "GetLoginData",
                Device_Id = "D001",
                Sync_Time = "",
                Company_Code = email,
                API_Body = new
                {
                    Username = email,
                    Pw = password
                }
            };

            var content = new StringContent(
                JsonConvert.SerializeObject(payload),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(
                "https://ez-staging-api.azurewebsites.net/api/External_Api/POS_Api/Invoke",
                content
            );

            return await response.Content.ReadAsStringAsync();
        }
    }
}