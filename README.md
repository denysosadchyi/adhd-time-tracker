# Tauri Windows Widget

A Windows always-on-top widget built with Tauri.

## Features

- Always-on-top window that stays above all other windows
- Transparent background with blur effect
- Customizable widget interface
- Lightweight and performant

## Prerequisites

- Node.js (v16 or higher)
- Rust (latest stable version)
- Tauri CLI

## Installation

1. Install Rust from https://rustup.rs/

2. Install Tauri CLI:
```bash
npm install -g @tauri-apps/cli
```

3. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

## Building

Build the application:
```bash
npm run build
```

The built application will be in `src-tauri/target/release/`

## Configuration

The widget window configuration can be modified in `src-tauri/tauri.conf.json`:
- Window size (width/height)
- Always-on-top behavior
- Transparency settings
- Window decorations

## License

MIT

