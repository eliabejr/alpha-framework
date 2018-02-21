#!/bin/sh

TMP_DIR=/tmp/site-bundle
mkdir $TMP_DIR

# Create bundle
npm install
npm install -g gulp
gulp
git commit -am "Create new bundle"

# Copy build to temp folder
cp -r ./build/ $TMP_DIR/build
BUILD_FILES=`ls ./build`

# Wipe out current site
git checkout gh-pages
git rm -rf .
mv .git $TMP_DIR/.git
rm -rf .
mv $TMP_DIR/.git .git

# Move new bundle to gh-pages
mv -f $TMP_DIR/build/** ./
git add $BUILD_FILES

# Commit and push changes
git commit -m "New bundle"
echo "\033[1;31mPushing site to GitHub repo\n\033[0m"
git push --force origin gh-pages

# Get back to develop
git checkout develop