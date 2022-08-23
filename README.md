![WeatherBot](/public/Header.png)

## Build
Build WeatherBot production Docker image:
~~~
docker build . -t weatherbot
~~~

## Run
Don't forget to specify your API token when starting bot:
~~~
docker run -e TOKEN=your_api_token weatherbot -d
~~~

## Development

Don't forget to create `.env` file with `TOKEN`
variable in it when running on a local machine:
~~~
npm run dev
~~~

To run all tests use:
~~~
npm run test
~~~
