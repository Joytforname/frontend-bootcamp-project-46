diff:
		node bin/gendiff.js -h
lint:
		npx eslint .	
install:
		npm ci
test:
		npx jest