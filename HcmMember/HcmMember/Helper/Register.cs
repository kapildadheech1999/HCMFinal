using HcmMember.Helper.IProvider;

namespace HcmMember.Helper
{
    public class Register:IRegister
    {
        public HttpClient Initial()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:44343/");
            return client;
        }
    }
}
