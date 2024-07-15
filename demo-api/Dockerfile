# Keep Build Time Depenceies versions stored in ARG variables defiend on top of the Dockerfile for easy access
ARG NODE_VERSION=20

# Use a light weight image to reduce the footprint of the image
FROM node:${NODE_VERSION}-alpine

# Configure your application using ENV variables to make it easy to change the configuration
# Pass them at runtime using the -e flag
ENV TOKEN=""

# Group commands to reduce the number of layers
RUN apk add shadow@edge=${SHADOW_VERSION} && \
    groupadd -r customgroup && useradd -r -g customgroup customuser

# Define custom users so the container does not run with root privileges
RUN groupadd -r customgroup && useradd -r -g customgroup customuser

ENV HOME /home/customuser

RUN mkdir -p $HOME && chown -R customuser:customgroup $HOME

# Set a working directory for you app so the code is separated from the root file system
WORKDIR $HOME/app

# Change the owner of the app directory to the custom user
RUN chown -R customuser:customgroup $HOME/app

# Change the user to the custom user
USER customuser

# Take advantage of Layer Caching and move up in the layers order the actions that are rarely changed
COPY package*.json ./

RUN npm install

# Expose the port that the app is listening on
# Note: This exposes the port to other containers but not to the host machine
EXPOSE 8080

# Use COPY over Add to avoid the automatic extraction of tar files
COPY . .

# Define the command that will run when the container starts
ENTRYPOINT ["npm", "start"]

# Achieves the same as the ENTRYPOINT command, but allows for the command to be overridden at runtime
# CMD ["npm", "start"]