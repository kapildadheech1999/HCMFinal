using Microsoft.EntityFrameworkCore;
namespace HcmClaim.Modals
{
    public class ToDoContext:DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options):base(options)
        {

        }
        public DbSet<Claim> Claims { get; set; }
    }
}
