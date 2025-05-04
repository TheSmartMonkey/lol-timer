# LoL Timer

League of Legends summoner spells timer desktop app - Tournament Legal

![app-example](https://github.com/TheSmartMonkey/lol-timer/blob/main/.github/images/app-example.png)

## Description

LoL Timer is a desktop application that helps League of Legends players track summoner spell cooldowns. This tool is designed to be tournament-legal as it doesn't interact with the game client and relies solely on manual input.

## Features

- Track summoner spell cooldowns for all players
- Tournament-legal implementation
- Simple and intuitive interface
- Desktop notifications when spells are ready
- Minimal resource usage

## Installation

1. Download the latest release from the [Releases page](https://github.com/TheSmartMonkey/lol-timer/releases)
2. Run the installer (`LoL Timer Setup x.x.x.exe`)
3. Follow the installation wizard
4. Launch LoL Timer from your desktop or start menu

## Development

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/TheSmartMonkey/lol-timer.git
cd lol-timer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Release Process

To create a new release, follow these steps:

1. Update version number in `package.json`

2. Commit all changes:
```bash
git add .
git commit -m "Prepare for release vX.X.X"
```

3. Create and push a new tag:
```bash
git tag -a vX.X.X -m "Release version X.X.X"
git push && git push --tags
```

4. Build the application:
```bash
npm run build
```

5. Create a new release on GitHub:
   - Go to the repository's "Releases" page
   - Click "Create a new release"
   - Select the tag you just created
   - Fill in the release title (e.g., "vX.X.X - Release Title")
   - Add release notes describing changes and new features
   - Upload the generated installer from the `dist` folder
   - Publish the release

### Release Notes Template

When creating a new release, use this template for your release notes:

```markdown
## What's New
- Feature 1
- Feature 2
- Bug fixes and improvements

## Installation
1. Download the installer
2. Run "LoL Timer Setup X.X.X.exe"
3. Follow the installation wizard

## Known Issues
- List any known issues or limitations

## Breaking Changes
- List any breaking changes if applicable
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Laurent Vandelle

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/TheSmartMonkey/lol-timer/issues/new) on GitHub.
