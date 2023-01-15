using Microsoft.EntityFrameworkCore;
using Pharmacy.Domain.models;

namespace Pharmacy.Domain.data;
public class PharmacyContext : DbContext
{
    public PharmacyContext(DbContextOptions<PharmacyContext> options):base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Drug> Drugs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Drug>().HasData(
            new Drug(1, "", "Мирамистин", "Описание", 200),
            new Drug(2, "", "Витамин С", "Описание", 180),
            new Drug(3, "", "Стрепсилс", "Описание", 350),
            new Drug(4, "", "Но-шпа", "Описание", 500),
            new Drug(5, "", "Парацетамол", "Описание", 300),
            new Drug(6, "", "Називин", "Описание", 200)
        );
    }
}