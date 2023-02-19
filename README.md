<h1 align="center">Wikicord 📖</h1>
<p align="center">A website where you can write your autobiography and share it with your friends!</p>
<h5>Demo: https://wikicord.cyclic.app</h5>
<h1>Features</h1>
<li><b>WikiList -</b> You can explore the wikis of others and gain a good understanding of their lives.</li>
<li><b>WikiEditor -</b> The wiki editor is packed with features, enabling you to write extensively about yourself. You can organize your content into various sections, such as your age, height, and other details, and showcase your social media profiles in an elegant manner. Additionally, an image gallery is in development, which will allow you to share your most cherished moments.</li>
<li><b>Privacy -</b> If you prefer to keep your wiki confidential, you have the option to make it private and assign a password to limit access only to those you authorize</li>
<li><b>Text formatting -</b> You can utilize the inbuilt text formatting options to enhance your text according to your preferences (although only header formatting is currently available). Rest assured that more text formatting features will be added soon.</li>

<h1>Tech Stack</h1>
I used MERN Stack for this website and cloudinary for storing profile pictures. I also used vite instead of CRA obviously because its a lot better.

<h1>Setup</h1>
Setup these enviroment variables, install the node modules and run the respective commands. Congratulations! You have your own version of wikicord running right on your computer! Make sure to change the BASE_URL variable with your api url in the api.js file so the frontend can communicate with the right backend.

| Variable    | Description                                                |
| ----------- | ---------------------------------------------------------- |
| MONGO_URL   | MongoDB connection URL                                      |
| PASSWORD    | App password for your Gmail account                         |
| EMAIL       | Email address for your Gmail account                        |
| JWT_KEY     | Secret key for JSON Web Token authentication                |
| FRONTEND_URL| URL for the frontend of your application                     |
| API_SECRET  | API secret for Cloudinary, a cloud-based image and video management service |
| API_KEY     | API key for Cloudinary                                      |
| CLOUD_NAME  | Cloud name for Cloudinary                                   |
