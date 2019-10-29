run:
	npx babel-node src/bin/gendiff.js

install:
	npm link

test:
	npm test

lint:
	npm run eslint .

publish:
	npm publish --dry-run
