# FB Game
A customizable, FizzBuzz-style game
-   Authors can define new games (rules + number range)
-   Players pick a game and race the clock answering prompts.
# 💻 Technology Stack
- **Backend** : .Net (ASP.NET Core)
- **Database**: SQL server
- **Frontend**: React + TypeScript (Semantic UI React)
- **Testing Framework**: xUnit + Moq (backend), Vitest + Testing Library + jest-dom (frontend)
- **Containerization**: Docker
# 📚 Architecture
- **Games.Presentation** - ASP.NET Core API
- **Games.Application** - Application logic (command/query handler)
- **Games.Domain** - Entities
- **Games.Infrastructure** - EF core DbContext
- **clients** - React UI
# ⚙️ Set up & Installation

 There are few things need to be installed before running the project:
- Docker Desktop
- Node.js & npm
- .NET 8 SDK
- An IDE
- SQL Server 

To run this project:
1. Clone the respository
    ```
    git clone https://github.com/SimonBui102/FBGame.git
    ```
2. Navigate to the main project directory:
    ```
    cd Games.Presentation
    ```
3. Run the project on Docker
- Docker Desktop need to be ready before running the project
    ```
    docker compose build
    docker compose up
    ```
- Backend API: http://localhost:3000/swagger/index.html
- Frontend: http://localhost:5000

# 🌐 External libraries used in this project
- [Semantic UI React](https://react.semantic-ui.com/)
- [Vitest](https://vitest.dev/)
- [Jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)
