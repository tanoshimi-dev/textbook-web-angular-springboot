#!/bin/bash

# Manual trigger script for hot reload
# Run this script whenever you want to recompile and restart

echo "🔄 Triggering hot reload..."
docker exec restaurant-backend mvn compile

if [ $? -eq 0 ]; then
    echo "✅ Compilation successful - Spring Boot DevTools will restart the app"
else
    echo "❌ Compilation failed"
fi
