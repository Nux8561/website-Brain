# Erzeugt hero.webm (VP9), hero.mp4 (H.264) und hero-poster.webp aus einem Quellvideo.
# Voraussetzung: ffmpeg im PATH (oder Pfad unten setzen).
param(
  [Parameter(Mandatory = $true)]
  [string] $Source,
  [string] $OutDir = (Join-Path $PSScriptRoot "..\template\public"),
  [string] $Ffmpeg = "ffmpeg"
)

$ErrorActionPreference = "Stop"
if (-not (Test-Path $Source)) { throw "Source not found: $Source" }
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$webm = Join-Path $OutDir "hero.webm"
$mp4  = Join-Path $OutDir "hero.mp4"
$poster = Join-Path $OutDir "hero-poster.webp"

Write-Host "Encoding WebM -> $webm"
& $Ffmpeg -y -i $Source -an -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -vf "scale=min(1920\,iw):-2" $webm

Write-Host "Encoding MP4 -> $mp4"
& $Ffmpeg -y -i $Source -an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -vf "scale=min(1920\,iw):-2" -crf 23 $mp4

Write-Host "Poster -> $poster"
& $Ffmpeg -y -i $Source -vframes 1 -vf "scale=min(1920\,iw):-2" $poster

Write-Host "Done. Pruefe Pfade in src/lib/content.ts (HERO_VIDEO) und index.html Preload."
