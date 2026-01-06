# Multi-stage build for optimal image size
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["NoShowIQ.sln", "./"]
COPY ["NoShowIQ.API/NoShowIQ.API.csproj", "NoShowIQ.API/"]
COPY ["NoShowIQ.Core/NoShowIQ.Core.csproj", "NoShowIQ.Core/"]
COPY ["NoShowIQ.Application/NoShowIQ.Application.csproj", "NoShowIQ.Application/"]
COPY ["NoShowIQ.Infrastructure/NoShowIQ.Infrastructure.csproj", "NoShowIQ.Infrastructure/"]
RUN dotnet restore

# Copy everything else and build
COPY . .
WORKDIR "/src/NoShowIQ.API"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NoShowIQ.API.dll"]
