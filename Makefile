.PHONY: protos
protos: protos/payj/models.proto
	protoc --rust_out backend/api-server/src/protos/ $<
