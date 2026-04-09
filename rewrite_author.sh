#!/usr/bin/env bash
# Rewrite Git Author using git-filter-repo.

SCRIPT_NAME=$(basename "$0")

if [[ "$#" -ne 4 ]]; then
  echo "Rewrite Git Author"
  echo
  echo "Usage: $SCRIPT_NAME OLD_NAME NEW_NAME OLD_EMAIL NEW_EMAIL"
  echo
  echo "e.g. $SCRIPT_NAME foo bar foo@bar.com fizz@buzz.net"
  exit 0
fi

OLD_NAME="$1"
NEW_NAME="$2"
OLD_EMAIL="$3"
NEW_EMAIL="$4"

# Ensure git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null; then
  echo "Error: git-filter-repo is not installed."
  exit 1
fi

# Run git-filter-repo to rewrite author and committer information
git filter-repo --force \
  --commit-callback '
if commit.author_name == b"'$OLD_NAME'" and commit.author_email == b"'$OLD_EMAIL'":
    commit.author_name = b"'$NEW_NAME'"
    commit.author_email = b"'$NEW_EMAIL'"
if commit.committer_name == b"'$OLD_NAME'" and commit.committer_email == b"'$OLD_EMAIL'":
    commit.committer_name = b"'$NEW_NAME'"
    commit.committer_email = b"'$NEW_EMAIL'"
'