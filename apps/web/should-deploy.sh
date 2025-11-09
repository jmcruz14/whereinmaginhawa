#!/bin/bash
# Vercel Ignored Build Step
# This script determines if Vercel should build the project
# It only deploys when places data or core files have changed

echo "🔍 Checking if deployment is needed..."
echo "📍 Current directory: $(pwd)"
echo "📂 Repository root: $(git rev-parse --show-toplevel)"

# Navigate to repo root to properly check files
cd "$(git rev-parse --show-toplevel)" || exit 1

# Check if this is a commit from GitHub Actions (JSON updates)
COMMIT_MESSAGE=$(git log -1 --pretty=%B)
echo "📝 Last commit: $COMMIT_MESSAGE"

if [[ "$COMMIT_MESSAGE" == *"auto-generate places index and stats"* ]]; then
  echo "✅ Places data updated - proceeding with deployment"
  exit 1  # Exit code 1 = proceed with build
fi

# Check if JSON files have changed in the last commit
CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || git diff --name-only HEAD)
echo "📄 Changed files:"
echo "$CHANGED_FILES"

if echo "$CHANGED_FILES" | grep -qE "(places\.json|stats\.json|places/.*\.json)"; then
  echo "✅ Place files changed - proceeding with deployment"
  exit 1  # Exit code 1 = proceed with build
fi

# Check if app code has changed
if echo "$CHANGED_FILES" | grep -qE "(apps/web/|packages/|\.github/workflows/)"; then
  echo "✅ Application code changed - proceeding with deployment"
  exit 1  # Exit code 1 = proceed with build
fi

# No relevant changes, skip build
echo "⏭️  No relevant changes detected - skipping deployment"
exit 0  # Exit code 0 = skip build
