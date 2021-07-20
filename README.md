# SLOBSPoints

Display channel points redemption on view for [Streamlabs](https://streamlabs.com/).

## Pre-request

Create a twitch application through the [twitch developer console](https://dev.twitch.tv/console/apps).
These will be used to generate tokens for twitch's PUB/SUB server. The application callback should be `http://localhost:8080/login`

### Features

- Ability to play/clear reward queue.
- Save rewards queue if app is closed.
- Cooldown between redeems (can be changed in settings).
- Allow for custom template with the redeemer's username.
- Built in widget editor.

#### Usage

![UI](https://github.com/bernzJ/SLOBSPoints/blob/master/screenshots/1.PNG)

First setup fill every fields in the "Settings" page.
Hover the green/red square to see app's state. Click on it to display the twitch authentication modal.

##### Login with twitch

Follow `twitch` authentication process to allow your new app to access your twitch's data. Once logged, you can close the modal.

We use the following scope:
`channel:read:redemptions` for subscribing to the pub/sub event for channel points.

##### Streamlabs Browser Source

This allow the app to display a custom widget via Streamlab's chrome implementation.

> Add a new browser source and set it as following:

| Key    | Value            | NB                                       |
| :----- | :--------------- | :--------------------------------------- |
| URL    | `localhost:8080` | Don't prefix url with "https" or "http"  |
| Width  | `200`            | your widget's width set in the css code  |
| Height | `100`            | your widget's Height set in the css code |

![UI](https://github.com/bernzJ/SLOBSPoints/blob/master/screenshots/slobs.gif)

#### Special thanks to

[TwitchLib](https://github.com/TwitchLib/TwitchLib)
