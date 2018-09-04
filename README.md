# TasksManager
A simple app to manage daily tasks

Tech stack:
- ASP.NET Core as a backend
- Angular as client-side framework, bootstrap
- Localdb EF

The application consists of two screens and has a sidebar with buttons on the left to switch the screens. The screens are:
- Add task form
- Task list

Each screen has its own URL and switching the screens highlight the button of currently selected screen.
Add task screen represents the form to add a new task with the next fields: name, description, priority, time to complete; and a button to save. By default all the tasks have ‘active’ status.
Tasks list shows a grid of tasks in the system with the following columns: name, priority, added date, time to complete and the one with Complete/Remove button. Time to complete column back tick every second up to 0 and show current remaining time. Button column displays ‘Complete’ button for active tasks and ‘Remove’- for completed. Removed task disappear from the grid. Clicking on a task reveal the task details beneath the grid and change URL in the browser. Task details displays a set of fields with task info including task description and its status.

On top of the grid there is a toolbar with refresh button (allows to update the grid with new data) and set of filters to filter out tasks by status.

# How to run
1. Clone project
2. Run TasksManager.sln with Visual Studio 2017
3. Open Package Manager Console
4. Run command
```
Update-Database
```
It is needed in order to migrate localdb scripts. Also it is will start the process of restoring npm packages so be patient.
In the end you will get TasksContext db in your localdb with dbo.Tasks table

5. Run with IIS Express in Debug or Release configuration.
6. Enjoy!

# TODO:
- Real-time updates in the grid from server
- Grid should support up to 100k rows with infinity scrolling (lazy loading)
- Unit tests
- Validate input on "Add task form"
- Refactor tasks-list.component.ts -> split and extract logic to components
- Upgrade markup -> remobe duplicates from tasks-list.component.html
