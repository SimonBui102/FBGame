using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Games.Contracts.Responses;
using MediatR;

namespace Games.Application.Queries.GameDefinition.GetGameDefinitions
{
    public record GetGameDefinitionsQuery() : IRequest<GetGameDefinitionsResponse>;

}
