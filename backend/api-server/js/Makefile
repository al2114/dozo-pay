all: login debug

login: install src/login.js src/protos.js
	browserify src/login.js -o ../static/scripts/login.bundle.js

debug: install src/debug.js src/protos.js
	browserify src/debug.js -o ../static/scripts/debug.bundle.js

install:
	npm install

clean:
	rm ../static/scripts/*.bundle.js
