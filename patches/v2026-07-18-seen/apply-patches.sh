#!/usr/bin/env bash
set -euo pipefail
ROOT=${1:-$(pwd)}
BASE_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT"
while IFS= read -r patch; do
  [ -z "$patch" ] && continue
  echo "== applying $patch =="
  git apply --whitespace=nowarn --binary "$BASE_DIR/$patch"
done < "$BASE_DIR/series.txt"
echo "Done. Review with: repo status"
