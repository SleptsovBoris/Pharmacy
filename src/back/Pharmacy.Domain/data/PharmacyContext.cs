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
            new Drug(1, "http://127.0.0.1:9000/product-images/miramistin.jpeg", "Мирамистин", "Описание", 200),
            new Drug(2, "http://127.0.0.1:9000/product-images/vitamin-c.jpg", "Витамин С", "Описание", 180),
            new Drug(3, "http://127.0.0.1:9000/product-images/strepsils.jpg", "Стрепсилс", "Описание", 350),
            new Drug(4, "http://127.0.0.1:9000/product-images/no-spa.png", "Но-шпа", "Описание", 500),
            new Drug(5, "http://127.0.0.1:9000/product-images/paracetamol.jpeg", "Парацетамол", "Описание", 300),
            new Drug(6, "http://127.0.0.1:9000/product-images/nasivin.jpg", "Називин", "Описание", 200)
        );
    }
}