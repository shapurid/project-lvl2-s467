run:
	npx babel-node src/bin/gendiff.js

install:
	npm link

build:
	npm run build

test:
	npm test
	
fix:
	./node_modules/.bin/eslint --fix --ignore-path .gitignore .
	
lint:
	npm run eslint .

publish:
	npm publish --dry-run
