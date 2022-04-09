using Microsoft.EntityFrameworkCore;
using System;

namespace TravelAppServer.Models
{
    public class TravelUsersContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CountryInfo> CountryInfo { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Hotel> Hotels { get; set; }

        public TravelUsersContext(DbContextOptions<TravelUsersContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<User>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Name).HasColumnType("nvarchar(45)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Email).HasColumnType("nvarchar(45)").IsRequired();   
            modelBuilder.Entity<User>().Property(u => u.Password).HasColumnType("nvarchar(45)").IsRequired();   
            modelBuilder.Entity<User>().Property(u => u.Status).HasColumnType("nvarchar(45)").IsRequired();   
            
            
            modelBuilder.Entity<Country>().ToTable("Countries");

            modelBuilder.Entity<Country>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<Country>().Property(u => u.PhoneCode).HasColumnType("int").IsRequired();
            modelBuilder.Entity<Country>().Property(u => u.CountryCode).HasColumnType("nvarchar(2)").IsRequired();
            modelBuilder.Entity<Country>().Property(u => u.Countryname).HasColumnType("nvarchar(80)").IsRequired();        
                
            
            modelBuilder.Entity<CountryInfo>().ToTable("CountryInfo");

            modelBuilder.Entity<CountryInfo>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<CountryInfo>().Property(u => u.CountryId).IsRequired();
            modelBuilder.Entity<CountryInfo>().Property(u => u.Rating).HasColumnType("double").IsRequired();
            modelBuilder.Entity<CountryInfo>().Property(u => u.NumberOfVoters).HasColumnType("int").IsRequired();
            modelBuilder.Entity<CountryInfo>().Property(u => u.Longitude).HasColumnType("double").IsRequired();      
            modelBuilder.Entity<CountryInfo>().Property(u => u.Latitude).HasColumnType("double").IsRequired();      
            
            modelBuilder.Entity<Feedback>().ToTable("Feedbacks");

            modelBuilder.Entity<Feedback>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<Feedback>().Property(u => u.UserId).HasColumnType("int").IsRequired();
            modelBuilder.Entity<Feedback>().Property(u => u.CountryId).HasColumnType("int").IsRequired();
            modelBuilder.Entity<Feedback>().Property(u => u.FeedbackText).HasColumnType("nvarchar(1000)").IsRequired();
            
            modelBuilder.Entity<Hotel>().ToTable("Hotels");

            modelBuilder.Entity<Hotel>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.CountryId).HasColumnType("CountryId").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.Name).HasColumnType("nvarchar(45)").IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.Longitude).HasColumnType("double").IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.Latitude).HasColumnType("double").IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.Rating).HasColumnType("int").IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.Image).HasColumnType("nvarchar(1000)").IsRequired();
            modelBuilder.Entity<Hotel>().Property(u => u.Link).HasColumnType("nvarchar(1000)").IsRequired();
        }
    }
}
//using Microsoft.EntityFrameworkCore;

//namespace TravelAppServer.Models
//{
//    public class UsersContext : DbContext
//    {
//        public DbSet<User> Users { get; set; }
//        public UsersContext(DbContextOptions<UsersContext> options)
//            : base(options)
//        {
//            Database.EnsureCreated();
//        }
//    }
//}
