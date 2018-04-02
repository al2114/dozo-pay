.PHONY: all rust swift clean
all: rust swift

rust: protos/models.proto protos/user_messages.proto
	mkdir -p backend/api-server/src/protos/
	protoc --proto_path protos/ --rust_out backend/api-server/src/protos/ $^
	echo "pub mod models;\npub mod user_messages;" > backend/api-server/src/protos/mod.rs

swift: protos/models.proto protos/user_messages.proto
	mkdir -p iOS/pesto/protos/
	protoc --proto_path protos/ --swift_out iOS/pesto/protos/ $^

js: protos/models.proto protos/user_messages.proto
	mkdir -p backend/api-server/static/scripts/protos/
	pbjs -t static-module -w commonjs $^ -o backend/api-server/static/scripts/protos/protos.js

clean:
	rm -r backend/api-server/src/protos/
	rm -r iOS/pesto/protos/
