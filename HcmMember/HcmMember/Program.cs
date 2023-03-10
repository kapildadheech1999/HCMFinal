using HcmMember;
using HcmMember.Helper;
using HcmMember.Helper.IProvider;
using HcmMember.Modals;
using HcmMember.Provider;
using HcmMember.Provider.IProvider;
using HcmMember.Repository;
using HcmMember.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Log.Logger = new LoggerConfiguration().MinimumLevel.Debug()
    .WriteTo.File("log/HcmMemberLog.txt", rollingInterval: RollingInterval.Day).CreateLogger();
builder.Host.UseSerilog();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ToDoContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDatabase")));
builder.Services.AddScoped<IMemberAndPhysician, MemberAndPhysician>();
builder.Services.AddAutoMapper(typeof(MappingConfig));
builder.Services.AddScoped<IRegister, Register>();
builder.Services.AddScoped<IRegistration, Registration>();
builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) =>
    {
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
