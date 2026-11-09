#!/usr/bin/env bash
# Downloads the reusable project + client images into public/projects and
# public/clients. Safe to re-run (idempotent).
set -euo pipefail

BASE="https://www.druvamoksh.com/assets"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJ="$ROOT/public/projects"
CLIENT="$ROOT/public/clients"
mkdir -p "$PROJ" "$CLIENT"

get() { # url  dest
  echo "  -> $2"
  curl -sfL "$1" -o "$2" || echo "     (skipped: $1)"
}

echo "Project images:"
get "$BASE/lynora-B-uj2CaU.jpeg"        "$PROJ/lynora.jpeg"
get "$BASE/axelerate-BPeN-k1M.jpeg"     "$PROJ/axelerate.jpeg"
get "$BASE/sensurair-BkLgDDK7.jpeg"     "$PROJ/sensurair.jpeg"
get "$BASE/music-BWzYU695.jpeg"         "$PROJ/music.jpeg"
get "$BASE/vaanmegam-Dn1nk1Kx.jpeg"     "$PROJ/vaanmegam.jpeg"
get "$BASE/playfulpython-DjrY5C66.jpeg" "$PROJ/playfulpython.jpeg"
get "$BASE/queerink-fqcEnf1g.jpeg"      "$PROJ/queerink.jpeg"
get "$BASE/marinepals-Ck3pQEa_.png"     "$PROJ/marinepals.png"
get "$BASE/drishti-AjysBAl0.webp"       "$PROJ/drishti.webp"
get "$BASE/svce-4D4x-CpW.png"           "$PROJ/svce.png"
get "$BASE/kripaya-xSSP9nB8.svg"        "$PROJ/kripaya.svg"
get "$BASE/meta-BHRd2jtt.jpeg"          "$PROJ/meta.jpeg"
get "$BASE/musictemple-MkidNfdE.webp"   "$PROJ/musictemple.webp"

echo "Client logos:"
get "$BASE/MitKat-Logo-2022-Image-DtApYE68.png" "$CLIENT/mitkat.png"
get "$BASE/lynoraai-BQAOXS0q.png"               "$CLIENT/lynoraai.png"
get "$BASE/marinepals-Ck3pQEa_.png"             "$CLIENT/marinepals.png"
get "$BASE/svce-4D4x-CpW.png"                   "$CLIENT/svce.png"
get "$BASE/kripaya-xSSP9nB8.svg"                "$CLIENT/kripaya.svg"

echo "Done."
