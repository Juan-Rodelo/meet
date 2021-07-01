1)
As a user,
I should be able to show/hide events details,
So I can see more information about an event only if I need it

2)
As a user,
I should be able to specify the number of events shown,
So I can control the number of events I see in my screen

3)
As a user,
I want to see my events also when I'm online,
So I can have access anywhere to the information I was looking earlier without needing any internet access.

4)
As an user,
I want to have an app shortcut,
So I can access the app easily

5)
As a user,
I should be able to see event data visualized in a dashboard, 
So that I can get a direct image of all the information I need

2.1
Scenario: An event element is collapsed by default
Given: The list of elements has been loaded
When: The user has not performed any action
Then: The element is collapsed

2.2
Scenario: The user can expand an event to see it details
Given: The list of elements has been loaded and the user has  not clicked on an event
When:  The user clicks on an event
Then: The events expands a you see the details.

2.3
Scenario:  User can collapse an event to hide its details
Given:  The list of elements has been loaded and user has clicked on an event and expanded the view to see its details
When: When user clicks hide details
Then: the event element will be collapsed to hide the event details

3.1
Scenario: When user hasn’t specified a number, 32 is the default number
Given: The list of elements has been loaded
When: A user has not specified the numbers of events it wants to see
Then: We see 32 events

3.2
Scenario: User can change the number of events they want to see
Given: The list of elements has been loaded
When: A user selects the number of elements they want to see
Then: A list of events will be rendered reflecting the number the user has specified

4.1
Scenario:  Show cached data when there’s no internet connection
Given: There is no internet connection or opened app without internet connection
When: a user tries to use the application
Then: The application will work with the data on the cache

4.2
Scenario: Show error when user changes the settings (city, time range)
Given: There is no internet connection or opened app without internet connection
WhenL a user tries to load new data that was not requested in an earlier session.
Then: The application will show an error

5.1
Scenario: Show a chart with the number of upcoming events in each city
Given: The list of events has been loaded
When: a user clicks on "Statistics"
Then: a chart with upcoming events will be rendered.