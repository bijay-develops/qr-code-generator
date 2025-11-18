## Client script — flow and behavior

This file documents the high-level flow of the client-side script located at `client/script.js`.

```mermaid
flowchart TD

A[User Submits Form] --> B{Prevent<br>Page Reload?}
B -->|Yes| C[Read Input Values<br>id, price]
C --> D[Create Data Object<br>id, price]
D --> E[Send POST Request<br>to /generate-qr]
E --> F[Server Returns<br>QR Code Blob]
F --> G[Convert Blob<br>to Object URL]
G --> H[Create <img> Element]
H --> I[Set img.src<br>to Blob URL]
I --> J[Clear Old QR Output]
J --> K[Append New QR Image<br>to #qr-result]
E -->|Error| X[Show Error in Console]

```

Explanation (brief):
- The script prevents the default form submission, reads user inputs, and builds a JSON payload.
- It sends the payload to the server endpoint (`/generate-qr`) and expects an image or binary blob in response.
- When the response arrives the script converts it (if necessary) into an object URL and sets it as the `src` of an `img` element inside `#qr-result`.
- Errors are logged to the console and can be presented to the user.

See `client/script.js` for the concrete implementation.
