## Shots Fired: Custom Valorant UI

An example project to create a custom UI for Valorant using in-game data streamed from [Shots Fired](https://shotsfired.games/).

[![Valorant with a custom HUD](http://img.youtube.com/vi/H1BhZOuGqso/0.jpg)](http://www.youtube.com/watch?v=H1BhZOuGqso "Shots Fired - Custom Valorant UI")

## Prerequisites

You will need the following tools to use the project:

- npm and npx (I use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) in a Windows Terminal)

## First time setup

This project uses SQLite (database) to capture and retrieve data from a webhook. Before using the project for the first time, you will need to initialise the database. To do this run the following in a Windows Terminal:

```shellscript
npm run db:init
```

## Starting the server

From this point, the usual command to get everything up and running is:

```shellscript
npm run dev
```

A development web server ([Remix](https://remix.run/)) and socket server ([socket.io](https://socket.io/)) will be created to:

1. Render a UI
2. Create a route to listen for webhook requests from Shots Fired
3. Write to and read from a local SQLite database
4. Emit socket events to change which characters have been selected in the roster

## Using the UI

Create a `Browser` source in OBS:

- Set the URL to http://localhost:3000
- Set the width & height to the full dimensions of your output
- Set the `Custom CSS` to: `body { margin: 0px auto; overflow: hidden; }`
- Ensure it is the top layer in your Source list

Inside Shots Fired, create a new Valorant Event for the `Roster` game event and select a webhook action.

- Set the URL to http://localhost:3000/webhook/roster

## Customising the UI

> [!NOTE]
> You will need some dev. experience to make changes.

Styling changes can be made using [Tailwind CSS](https://tailwindcss.com/), and you will find the current UI composition in **app/routes/\_index.tsx**.

If you would like to add more webhook & websocket functionality, you can take a look at **app/routes/webhook.roster.ts**, this is a [Remix Action Function](https://remix.run/docs/en/main/route/action). You can read more about the file naming used for routing in [Remix Route Configuration](https://remix.run/docs/en/main/discussion/routes).

To store and retrieve data past the current execution, data is written to a SQLite database. When creating new schema, it is good practice to create a new migration in the **migrations** directory (take a look at **migrations/2024-08-19-roster.ts** for an example). There's an example of the read/write code in **app/repository/roster.ts**.

The current number of players is set to **10**, you can customise this in **app/constants.ts**.

## Terms & Conditions

This software is provided AS IS and AS AVAILABLE. There are no guarantees, warranties or refunds. Shots Fired and anyone affiliated does not accept any liability for damage or loss in any way to yourself or third parties as a result of using this code.

This is an example project intended for learning purposes and no further support is offered for feature requests or changes.
