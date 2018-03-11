.PHONY: protos
protos: protos/payj/models.proto protos/payj/user_messages.proto
	protoc --proto_path protos/ --rust_out backend/api-server/src/protos/ $^
