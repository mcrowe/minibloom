#!/usr/bin/env bash

function setVersion() {
  find package.json -type f -exec sed -i "" "s/\"version\": \".*\"/\"version\": \"$1\"/g" {} +
}

echo "Next version (e.g. 0.0.1):"
read version

echo "Updating version in package.json..."
setVersion $version

echo "Building..."
npm run build

echo "Publishing to npm..."
npm publish --access=public

echo "Tagging git version and pushing to Github..."
git add .
git commit -am "Release v$version"
git tag "v$version"
git push origin
git push origin "v$version"

