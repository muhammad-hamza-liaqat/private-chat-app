# Private Chat

This Node.js application is used to send private messages from one user to another user via WebSocket communication.

## How to Run

To run this application:

1. Install the required packages by typing `npm install` in your terminal.
2. Start the server by typing `nodemon` in the terminal.

## How to Test

To test the application:

1. Open Postman.
2. Open two different WebSocket tabs.
3. Connect each tab to the server using the URL `ws://localhost:8080`.
4. Once connected, you will receive a unique socket ID for each connection.
5. Connect as the sender using one WebSocket tab and as the recipient using another WebSocket tab.
6. Send a private message by passing the following JSON:

```json
{
    "senderID": "senderID",
    "recipientID": "receiverID",
    "message": "Hello, this is a private message."
}
```

Replace `"senderID"` and `"receiverID"` with the respective socket IDs obtained upon connection.

## Notes

- Ensure that both sender and recipient are connected to the server before sending messages.
- Messages are sent in real-time using WebSocket communication.
- Handle errors gracefully in case of failed connections or message delivery.
