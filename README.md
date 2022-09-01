# scheduler


<div id="top"></div>

<!-- PROJECT LOGO -->
<br/>
<div align="center">
  <a href="https://github.com/BigYusuf/scheduler">
    <h1 align="center"style="color:black;">Email<span style="color:blue;">Scheduler</span></h1>
  </a>

  <p align="center">
    Cron Email Scheduler!
    <br />
    <a href="https://github.com/BigYusuf/scheduler"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://scheduler.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/BigYusuf/scheduler/issues">Report Bug</a>
    ·
    <a href="https://github.com/BigYusuf/scheduler/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

```javascript
    
const cron = require('node-cron');
cron.schedule(`* * * * *`, () => {
    console.log("send Email every mminute")
})
    
```

This project is simple and unique. The project is all about emails. I recently receive a proposal from an email marketter to create an email app for onboarding customers and sending predefined sendgrid template email to the client database

Due to our contract reasons I can't share any confidential details, add features like:

- Use nodemailer instead of sendgrid that was used in the project
- the priorities of this project is different from the real one(Just share the idea to developers)
- Not an expert with email templates.

Of course, the API is cool. Although in the future I plan to add middlewares and manage more errors efficiently


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Here are the list of major frameworks/ libraries used to bootstrap this project

- [Node.js](https://nodejs.org/)
- [Express.js](https://www.expressjs.com/)
- [MongoDB](https://mongodb.com/)
- [Heroku](https://www.heroku.com/)
- [Nodemailer](https://nodemailer.com/)
- [Node Cron](https://crontab.guru/#5_4_*_*)

<p align="right">(<a href="#top">back to top</a>)</p>

### Features

This api is focused on emails to serve clients easily.

#### Verification Email

[![Sample Email][product-screenshot3]](https://scheduler.vercel.app/)

#### Reset password Email

[![Mobile screen][product-screenshot2]](https://scheduler.vercel.app/)

#### Promotional Email

[![Desktop Mode][product-screenshot]](https://scheduler.vercel.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo

   ```sh
   git clone https://github.com/BigYusuf/scheduler.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Enter your KEYS in `.env`

   ```javascript
    MONGO_URL = "ENTER YOUR MONGO DB URL";
    PORT = "ENTER YOUR DESIRED PORT";
    JWT_SECRET = "ENTER YOUR JWT SECRET";
    JWT_EXPIRES_TIME = "ENTER YOUR JWT EXPRIRY TIME"
    COOKIE_EXPIRES = "ENTER YOUR COOKIE EXPIREY TIME"
    USER_EMAIL="ENTER YOUR EMAIL PREFERRABLY GMAIL"
    CLIENT_ID="ENTER YOUR EMAIL CLIENT ID (SETUP FOR GMAIL)"
    CLIENT_SECRET="ENTER YOUR EMAIL CLIENT SECRET (SETUP FOR GMAIL)"
    REDIRECT_URI= "ENTER YOUR EMAIL REDIRECT URI (SETUP FOR GMAIL)"
    REFRESH_TOKEN="ENTER YOUR EMAIL REFRESH TOKEN (SETUP FOR GMAIL)"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Yusuf Lateef - [Connect via Messenger](http://m.me/Bigyusufff/) - yusuflateef0000@gmail.com mystik5551@gmail.com

Project Link: [https://github.com/BigYusuf/scheduler](https://github.com/BigYusuf/scheduler)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/BigYusuf/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/BigYusuf/scheduler/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BigYusuf/scheduler.svg?style=for-the-badge
[forks-url]: https://github.com/BigYusuf/scheduler/network/members
[stars-shield]: https://img.shields.io/github/stars/BigYusuf/scheduler.svg?style=for-the-badge
[stars-url]: https://github.com/BigYusuf/scheduler/stargazers
[issues-shield]: https://img.shields.io/github/issues/BigYusuf/scheduler
[issues-url]: https://github.com/BigYusuf/scheduler/issues
[license-shield]: https://img.shields.io/github/license/BigYusuf/scheduler.svg?style=for-the-badge
[license-url]: https://github.com/BigYusuf/scheduler/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/bigyusufff
[product-screenshot]: images/promo1.png
[product-screenshot2]: images/forgot.png
[product-screenshot3]: images/verify.png
[product-screenshot4]: images/databasesample.png