![WeatherBot](/public/Header.png)

WeatherBot is a Telegram bot for receiving weather
forecasts, written in JavaScript.

The bot uses the Open-Meteo API to get weather
information and cannot be used for commercial purposes.

https://open-meteo.com/

## 🔨 Build
Build WeatherBot production Docker image:
~~~
docker build . -t weatherbot
~~~

## 🏃‍♂️ Run
Run WeatherBot in production:
~~~
docker run \
  -e TOKEN=your_api_token \
  weatherbot -d
~~~

## 👩‍💻 Development
1. Create `.env` file at the root of the project:
~~~
TOKEN=your_api_token
~~~
2. Install dependencies:
~~~
yarn install
~~~
3. Run WeatherBot in development mode:
~~~
yarn dev
~~~

## 🧪 Testing
Run all tests:
~~~
yarn test
~~~

## 📄 License
Copyright (c) 2022 gugdun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
