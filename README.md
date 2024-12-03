# Banorte 3D Secure Card Validation

This project uses Puppeteer to validate cards on Banorte 3D Secure.

## Overview

The Banorte 3D Secure endpoint requires JavaScript to run, so we use Puppeteer to execute it in a headless browser. Additionally, we use Express for quick access.

## Technologies

- **Puppeteer**: To automate and control the browser.
- **Express**: To create a web server for quick access.
- **Docker**: To containerize the application, ensuring consistency across different environments and simplifying deployment.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd puppe
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the Express server:
   ```bash
   npm start
   ```
2. Access the validation endpoint through your browser or API client.
