#!/bin/sh
set -eu

PROJECT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
NODE_BIN="${NODE_BIN:-$(command -v node || true)}"

if [ -z "$NODE_BIN" ]; then
  echo "Node.js was not found. Please install Node.js first."
  exit 1
fi

cd "$PROJECT_DIR"
exec "$NODE_BIN" "$PROJECT_DIR/server.js"
