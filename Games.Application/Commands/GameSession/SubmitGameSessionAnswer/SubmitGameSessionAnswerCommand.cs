using Games.Contracts.Responses;
using MediatR;

namespace Games.Application.Commands.GameSession.SubmitGameSessionAnswer;

public record SubmitGameSessionAnswerCommand(int GameSessionId,int RandomNumber, string PlayerAnswer):IRequest<SubmitGameSessionAnswerResponse>;