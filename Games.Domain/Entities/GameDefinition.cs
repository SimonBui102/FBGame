using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Games.Domain.Entities
{
    public class GameDefinition
    {
        public int Id { get; set; }
        public string AuthorName { get; set; } = "Author";
        public string GameName { get; set; } = "Default Name";

        public DateTime CreateDate { get; set; }


    }
}
