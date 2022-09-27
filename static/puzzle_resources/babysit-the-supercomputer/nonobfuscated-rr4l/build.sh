#!/bin/bash
set -eu

# Instructions:
# 1. Hand-translate interactive-nonobfuscated.ts -> interactive.ts
# 2. Use this command to compile interactive.ts -> interactive.js
# 3. Obfuscate with https://obfuscator.io/ with Options Preset set to Medium

tsc interactive.ts --out interactive.js --target es2021
cp interactive.js ..
