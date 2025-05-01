using Games.Contracts.Responses;
using Games.Domain.Entities;
using Mapster;

namespace Games.Application.Mappings;

public class MappingConfig
{
    public static void Configure()
    {
        TypeAdapterConfig<List<GameDefinition>, GetGameDefinitionsResponse>.NewConfig()
            .Map(dest => dest.GameDefinitionDtos, src => src);

        TypeAdapterConfig<GameDefinition, GetGameDefinitionByIdResponse>.NewConfig()
            .Map(dest => dest.GameDefinitionDto, src => src);


    }
}