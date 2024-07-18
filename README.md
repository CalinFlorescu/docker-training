## Useful commands 

<ul>
    <li>docker build --no-cache -t repo:latest . - force a docker build to not use caching (recommended for production builds)</li>
    <li>docker build -f Dockerfile.dev repo:latest . - use a custom Dockefile as a template to create the image</li>
    <li>docker build -t repo:1 --build-arg="NODE_ENV=production" . - Specify ARG parameters from the command line for build time</li>
    <li>docker run --env TOKEN=randomvalue repo:1 - Specify ENV parameters from the command line for run time</li>
    <li>docker build --platform="linux/amd64" -t data-pipeline . - Build an image specific to a platform architecture</li>
    <li>docker build --target build -t api . - Build a certain stage from a multi stage Dockerfile</li>
    <li>docker run -p 8080:8080 api - Run a container using port-forwarding so it can be accessed from the host machine</li>
    <li>docker run --mount type=bind,source=$(pwd)/,target=/home/customuser/app/ -p 8080:8080 demo-api:19</li>
</ul>