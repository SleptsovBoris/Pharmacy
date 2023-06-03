using Microsoft.EntityFrameworkCore;
using Pharmacy.Domain.models;

namespace Pharmacy.Domain.data;
public class PharmacyContext : DbContext
{
    // DbContextOptions<PharmacyContext> options
    public PharmacyContext(DbContextOptions<PharmacyContext> options):base(options)
    {

    }

    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     if (!optionsBuilder.IsConfigured)
    //     {
    //         optionsBuilder.UseSqlServer("Server=sleptsovpc;Database=Diplom_Pharmacy;Trusted_Connection=True;TrustServerCertificate=true;");
    //     }
    // }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DrugForm>().HasKey(df=>df.FormId);
        modelBuilder.Entity<DrugKind>().HasKey(dk=>dk.KindId);
        modelBuilder.Entity<Drug>().HasKey(d=>d.DrugId);
        modelBuilder.Entity<Manufacturer>().HasKey(m=>m.ManufacturerId);
        modelBuilder.Entity<User>().HasKey(u=>u.UserId);
        modelBuilder.Entity<Cart>().HasKey(c=>c.CartId);
        modelBuilder.Entity<CartItem>().HasKey(ci=>ci.CartItemId);
        modelBuilder.Entity<Order>().HasKey(o=>o.OrderId);
        modelBuilder.Entity<Payment>().HasKey(p=>p.PaymentId);
        modelBuilder.Entity<Apteka>().HasKey(a=>a.AptekaId);
        modelBuilder.Entity<FavorDrug>().HasKey(fd=>fd.FavorDrugId);
        modelBuilder.Entity<FavorPharmacy>().HasKey(fp=>fp.FavorPharmacyId);
        modelBuilder.Entity<PharmacyDrug>().HasKey(pd=>pd.PharmacyDrugId);

        modelBuilder.Entity<User>()
            .HasMany(e=>e.Carts)
            .WithOne(e=>e.User)
            .HasForeignKey(e=>e.UserId)
            .IsRequired(false);
        modelBuilder.Entity<User>()
            .HasMany(e=>e.Orders)
            .WithOne(e=>e.User)
            .HasForeignKey(e=>e.UserId)
            .IsRequired(false);
        modelBuilder.Entity<User>()
            .HasMany(e=>e.Payments)
            .WithOne(e=>e.User)
            .HasForeignKey(e=>e.UserId)
            .IsRequired(false);
    }

    public DbSet<Drug> Drugs { get; set; } = null!;
    public DbSet<DrugForm> DrugForms { get; set; } = null!;
    public DbSet<DrugKind> DrugKinds { get; set; } = null!;
    public DbSet<Manufacturer> Manufacturers{ get; set; } = null!;
    public DbSet<User> Users {get; set;} = null!;
    public DbSet<Cart> Carts {get; set;} = null!;
    public DbSet<CartItem> CartItems {get; set;} = null!;
    public DbSet<Order> Orders {get; set;} = null!;
    public DbSet<Payment> Payments{get; set;} = null!;
    public DbSet<Apteka> Apteki {get;set;} = null!;
    public DbSet<FavorDrug> FavorDrugs{get; set;} = null!;
    public DbSet<FavorPharmacy> FavorPharmacies{get; set;} = null!;
    public DbSet<PharmacyDrug> PharmacyDrugs{get; set;} = null!;
}