# goldDigger — Gold Price Tracker & Invoice Generator

A Node.js command-line tool that fetches real-time gold prices and generates professional PDF invoices for gold transactions.

---

## Features

- **Real-time gold prices** — Fetches current gold price per gram/tola via external API
- **PDF invoice generation** — Creates formatted invoice PDFs for gold purchases
- **User data handling** — Accepts customer and transaction details
- **Express server** — REST API for programmatic access

---

## Tech Stack

- **Node.js** — Runtime
- **Express** — HTTP server
- **PDF generation** — `createPdf.js` outputs formatted invoice files

---

## Project Structure

```
goldDigger/
├── server.js          # Express server entry point
├── getGoldPrice.js    # Fetches real-time gold price from API
├── handleuserData.js  # Processes customer/transaction input
├── createPdf.js       # Generates PDF invoice
├── utils.js           # Shared utility functions
└── public/            # Static assets
```

---

## Getting Started

```bash
npm install
node server.js
```

The server starts and exposes endpoints to fetch gold prices and generate invoices. A sample output invoice (`goldInvoice.pdf`) is included in the repo for reference.

---

## Sample Output

A sample generated invoice is available at `goldInvoice.pdf` in the root of this repository.
