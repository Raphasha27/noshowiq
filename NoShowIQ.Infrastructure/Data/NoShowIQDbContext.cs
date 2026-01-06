using Microsoft.EntityFrameworkCore;
using NoShowIQ.Core.Entities;

namespace NoShowIQ.Infrastructure.Data;

public class NoShowIQDbContext : DbContext
{
    public NoShowIQDbContext(DbContextOptions<NoShowIQDbContext> options) : base(options)
    {
    }

    public DbSet<Appointment> Appointments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configs
        modelBuilder.Entity<Appointment>().HasKey(a => a.Id);
    }
}
