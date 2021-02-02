EQ Works Product Sample Challenge
---

[What is this for?](https://github.com/EQWorks/work-samples#what-is-this)

### Overview

This application was created to display event data metrics that are queried from a Postgres database. It was implemented using React (Next.js) and Node.js (Express). I used D3.js for data visualization, as well as integrated an interactive map using Google Map API. For the frontend, I decided to use Next.js as opposed to running Create React App, in order to take advantage of several of its out-of-the-box features, including page routing, and static-site generation using `getStaticProps` in order to fetch and pre-render the event data at build time. For visualization tools, despite having a greater learning curve than many other chart libraries, I decided to go with D3.js as the challenge presented itself with the perfect opportunity to learn to use this tool that is considered industry standard.

#### Challenges I ran into

- Being a first-time user of D3.js, I had a few obstacles when it came to rendering the data on the charts. I had to play around with the different ways of displaying the data at different hours and dates, while managing the state of the chart to make sure that it displayed the correct information.
- I had some issues deploying the application, which was using a custom express server with Next.js. I tried multiple deployments, and in the end, I created separate deployments with the frontend and backend being split into different directories.

#### What I learned

- Overall, this project had its challenges to overcome, but I ended up learning a lot from it! This was my first time integrating a Next.js application with a custom Express backend. From a general full-stack perspective, I gained a better understanding on how the two sides work together locally and in production.
- Picking up D3.js was quite a task, but I learned a lot about data visualization and the different ways of managing and presenting data to a user.

### Getting Started Locally

To run the frontend:
- `cd client`
- `npm install`
- `npm run dev`

To run the backend:
- `cd api`
- `npm install`
- `npm run dev`
