using Games.Contracts.Dtos;
using Games.Contracts.Responses;
using Games.Domain.Entities;
using Mapster;

namespace Games.Application.Mappings;

public class MappingConfig
{
    public static void Configure()
    {
        TypeAdapterConfig<List<GameDefinition>, GetGameDefinitionsResponse>.NewConfig()
            .Map(dest => dest.GameDefinitionDtos, src => src.Adapt<List<GameDefinitionDto>>());

        TypeAdapterConfig<GameRule, GameRuleDto>.NewConfig();

        TypeAdapterConfig<GameDefinition, GameDefinitionDto>.NewConfig()
            .Map(dest => dest.Rules, src => src.GameRules.Adapt<List<GameRuleDto>>());


        TypeAdapterConfig<GameDefinition, GetGameDefinitionByIdResponse>.NewConfig()
            .Map(dest => dest.GameDefinitionDto, src => src.Adapt<GameDefinitionDto>());


        



    }
}