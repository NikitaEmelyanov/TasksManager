# TasksManager

A simple app to manage tasks

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
