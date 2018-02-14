FROM rustlang/rust:nightly
RUN cargo install Rocket
RUN cargo install diesel_cli --no-default-features --features postgres
RUN cargo install cargo-watch
RUN apt-get update && apt-get install unzip
RUN wget https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip \
        && unzip protoc-3.5.1-linux-x86_64.zip -d /usr/bin \
        && rm protoc-3.5.1-linux-x86_64.zip
WORKDIR /usr/src/app
EXPOSE 3001
VOLUME ["/usr/local/cargo"]
