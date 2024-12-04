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
   /\*\*

## Principal endpoint

Validates the provided credit card credentials.
Principal endpoint: `/api/validateCredentials`
The request must be a POST request to `localhost:8080/api/validateCredentials` with the following JSON body:

```json
{
  "NUMERO_TARJETA": "Card number",
  "FECHA_EXP": "Expiration date (MM/YY)",
  "MONTO": "Transaction amount",
  "MARCA_TARJETA": "Card brand (e.g., VISA, MasterCard)",
  "ID_AFILIACION": "Merchant affiliation ID",
  "NOMBRE_COMERCIO": "Merchant name",
  "CIUDAD_COMERCIO": "Merchant city",
  "URL_RESPUESTA": "Response URL",
  "CERTIFICACION_3D": "3D Secure certification code",
  "REFERENCIA3D": "3D Secure reference",
  "CIUDAD": "Cardholder city",
  "PAIS": "Cardholder country",
  "CORREO": "Cardholder email",
  "NOMBRE": "Cardholder first name",
  "APELLIDO": "Cardholder last name",
  "CODIGO_POSTAL": "Cardholder postal code",
  "ESTADO": "Cardholder state",
  "CALLE": "Cardholder street address",
  "VERSION_3D": "3D Secure version",
  "NUMERO_CELULAR": "Cardholder mobile number",
  "TIPO_TARJETA": "Card type (e.g., DB for debit)"
}
```
