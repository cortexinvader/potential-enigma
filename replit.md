# Knight Bot - WhatsApp Bot Project

## Project Overview
Knight Bot is a comprehensive WhatsApp bot built using Node.js and the Baileys library. It provides group management features, interactive games, and various utility commands for WhatsApp users.

## Current State
- **Status**: Successfully imported and configured for Replit environment
- **Version**: 2.1.8
- **Main Entry Point**: index.js
- **Authentication**: WhatsApp session already configured with valid credentials

## Key Features
- Group management commands (tag all, mute/unmute, ban/unban)
- Interactive games (Tic-Tac-Toe, Hangman, Trivia)
- Text-to-Speech functionality
- Sticker creation and manipulation
- Anti-link and anti-spam protection
- YouTube and social media downloaders
- AI chat features
- Owner/admin command restrictions

## Project Architecture
- **Entry Point**: `index.js` - Main bot initialization and WhatsApp connection
- **Message Handler**: `main.js` - Core message processing and command routing
- **Commands**: `/commands/` directory - Individual command implementations
- **Libraries**: `/lib/` directory - Utility functions and helpers
- **Data**: `/data/` directory - JSON files for bot state and user data
- **Session**: `/session/` directory - WhatsApp authentication files
- **Configuration**: `config.js` and `settings.js` - Bot configuration

## Environment Setup
- **Language**: Node.js 20
- **Dependencies**: Installed via npm (562 packages)
- **Workflow**: Console application running `node index.js`
- **Deployment**: Configured as VM deployment for always-on operation

## Recent Changes (September 18, 2025)
- Imported from GitHub repository
- Configured Node.js 20 environment
- Verified existing WhatsApp session credentials
- Set up workflow for continuous operation
- Configured deployment settings for production
- Created project documentation

## Command Examples
- `.help` or `.menu` - Display available commands
- `.tagall` - Tag all group members (admin only)
- `.sticker` - Create sticker from image/video
- `.play [song]` - Download music from YouTube
- `.tts [text]` - Convert text to speech
- `.weather [city]` - Get weather information

## Technical Notes
- Uses Baileys library for WhatsApp Web API
- Supports multi-device WhatsApp features
- Memory optimized with garbage collection
- Includes anti-crash error handling
- Session persistence across restarts

## Owner Configuration
- Owner number configured in settings.js
- Bot responds to owner with special privileges
- Private/public mode toggle available

## Security Features
- User ban system
- Admin command restrictions
- Anti-spam and anti-link protection
- Private message blocker option