FROM rustlang/rust:nightly
RUN cargo install diesel_cli --no-default-features --features postgres cargo-watch Rocket
RUN wget https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-linux-x86_64.zip && unzip protoc-3.5.1-osx-x86_64.zip -d /bin/usr && rm protoc-3.5.1-osx-x86_64.zip
WORKDIR /usr/src/app
EXPOSE 3001
VOLUME ["/usr/local/cargo"]
