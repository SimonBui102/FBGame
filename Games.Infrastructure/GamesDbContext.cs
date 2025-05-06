using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Games.Domain.Entities;


namespace Games.Infrastructure
{
    public class GamesDbContext :DbContext
    {

        public GamesDbContext(DbContextOptions options) : base (options)
        {
            
        }

        public DbSet<GameDefinition> GameDefinitions { get; set; }
        public DbSet<GameRule> GameRules { get; set; }
        public DbSet<GameSession> GameSessions { get; set; }



    }
}
