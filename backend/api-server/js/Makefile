all: login debug

login: src/login.js src/protos.js
	browserify src/login.js -o ../static/scripts/login.bundle.js

debug: src/debug.js src/protos.js
	browserify src/debug.js -o ../static/scripts/debug.bundle.js

clean:
	rm ../static/scripts/*.bundle.js
