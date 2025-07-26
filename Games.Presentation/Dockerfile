FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app

EXPOSE 3000
EXPOSE 3001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Development
WORKDIR /src

COPY ["Games.Application/Games.Application.csproj","Games.Application/"]
COPY ["Games.Contracts/Games.Contracts.csproj","Games.Contracts/"]
COPY ["Games.Domain/Games.Domain.csproj","Games.Domain/"]
COPY ["Games.Infrastructure/Games.Infrastructure.csproj","Games.Infrastructure/"]
COPY ["Games.Presentation/Games.Presentation.csproj","Games.Presentation/"]


RUN dotnet restore "Games.Presentation/Games.Presentation.csproj"

COPY . .

WORKDIR "/src/Games.Presentation"
RUN dotnet build "Games.Presentation.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build as publish
ARG BUILD_CONFIGURATION=Development

RUN dotnet publish "Games.Presentation.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false


FROM base as final
WORKDIR /app

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet","Games.Presentation.dll"]