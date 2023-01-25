using Microsoft.EntityFrameworkCore;
namespace HcmMember.Modals
{
    public class ToDoContext:DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options):base(options)
        {

        }
        public DbSet<Member> Members { get; set; }
        public DbSet<Physician> Physicians { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Physician>().HasData(
                new Physician()
                {
                    PhysicianId=1,
                    PhysicianName="John",
                    PhysicianState="UT"
                },
                new Physician()
                {
                    PhysicianId = 2,
                    PhysicianName = "Hari",
                    PhysicianState = "UA"
                },
                new Physician()
                {
                    PhysicianId = 3,
                    PhysicianName = "Mittal",
                    PhysicianState = "TX"
                },
                new Physician()
                {
                    PhysicianId = 4,
                    PhysicianName = "Patrick",
                    PhysicianState = "OH"
                },
                new Physician()
                {
                    PhysicianId = 5,
                    PhysicianName = "Mark",
                    PhysicianState = "CA"
                },
                new Physician()
                {
                    PhysicianId = 6,
                    PhysicianName = "Jessica",
                    PhysicianState = "NY"
                },
                new Physician()
                {
                    PhysicianId = 7,
                    PhysicianName = "Mary",
                    PhysicianState = "IL"
                },
                new Physician()
                {
                    PhysicianId = 8,
                    PhysicianName = "Stacy",
                    PhysicianState = "FL"
                }
                );
        }
    }
}
