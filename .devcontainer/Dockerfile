FROM debian:bookworm-slim

# update repos && upgrade && set timezone
RUN apt update && apt -y upgrade && DEBIAN_FRONTEND="noninteractive" TZ="America/Chicago" apt install -y tzdata

# install baseline
RUN apt update && apt -y install --no-install-recommends lynx make ssh openssl vim-nox exuberant-ctags wget curl

# install cli image tools
# RUN apt update && apt -y install --no-install-recommends jhead libgd3 netpbm imagemagick graphviz

# debian bug -- remove sometime?
RUN mkdir -p /usr/share/man/man1

# install java
RUN apt update && apt -y install --no-install-recommends openjdk-17-jdk-headless jlex javacc junit4 junit5 maven

# install llvm/clang for modern c
RUN apt update && apt -y install --no-install-recommends llvm clang

# install node/npm for javascript
RUN apt update && apt -y install --no-install-recommends nodejs npm

# install golang
RUN apt update && apt -y install --no-install-recommends golang

# install developer tools
RUN apt update && apt -y install --no-install-recommends git

# install crypto tools
RUN apt update && apt -y install --no-install-recommends dumpasn1

# install something to test X
# RUN apt update && apt -y install --no-install-recommends x11-apps

# install some graphical editors
# RUN curl -sSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | apt-key add -
# RUN echo "deb [arch=amd64,arm64,armhf] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list
# RUN apt update && apt -y install --no-install-recommends code

# clean up
RUN apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

RUN groupadd -r devcontainer && useradd -r -g devcontainer -s /bin/bash -m devcontainer && chown -R devcontainer:devcontainer /home/devcontainer

USER devcontainer

WORKDIR /home/devcontainer

CMD ["/bin/bash"]
