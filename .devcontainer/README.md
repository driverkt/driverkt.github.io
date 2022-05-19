# How to use this Docker Image

## Build the Image:
``docker build -t `whoami`/devcontainer .``

## Run an X App:

### Install XQuartz:
`brew install --cask xquartz`

### Setup X Forwarding:
`xhost +$(hostname)`

``docker run --rm -e DISPLAY=$(ipconfig getifaddr en1):0 -it `whoami`/devcontainer xeyes``