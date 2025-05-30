﻿using Games.Contracts.Responses;
using MediatR;

namespace Games.Application.Commands.GameSession.CreateGameSession;

public record CreateGameSessionCommand(string PlayerName, int Duration, int GameDefinitionId):IRequest<CreateGameSessionResponse>;