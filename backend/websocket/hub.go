package websocket

import (
	"log"
	"sync"
)

// Hub maintains active connections and broadcasts messages to clients
type Hub struct {
	// Registered clients
	clients map[uint]map[*Client]bool

	// Messages to be sent to specific clients
	messages chan *Message

	// Register requests from clients
	register chan *Client

	// Unregister requests from clients
	unregister chan *Client

	// Mutex for concurrent access to clients map
	mutex sync.RWMutex
}

// Message represents a message sent between clients
type Message struct {
	// Sender client
	sender *Client

	// Receiver user ID
	receiverID uint

	// Message content
	data []byte
}

// NewHub creates a new hub instance
func NewHub() *Hub {
	return &Hub{
		clients:    make(map[uint]map[*Client]bool),
		messages:   make(chan *Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		mutex:      sync.RWMutex{},
	}
}

// Run starts the hub
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mutex.Lock()
			if _, ok := h.clients[client.userID]; !ok {
				h.clients[client.userID] = make(map[*Client]bool)
			}
			h.clients[client.userID][client] = true
			h.mutex.Unlock()
			log.Printf("Client registered: User ID %d", client.userID)

		case client := <-h.unregister:
			h.mutex.Lock()
			if _, ok := h.clients[client.userID]; ok {
				if _, ok := h.clients[client.userID][client]; ok {
					delete(h.clients[client.userID], client)
					close(client.send)
					if len(h.clients[client.userID]) == 0 {
						delete(h.clients, client.userID)
					}
				}
			}
			h.mutex.Unlock()
			log.Printf("Client unregistered: User ID %d", client.userID)

		case message := <-h.messages:
			h.mutex.RLock()
			// Send to all clients of the receiver
			if clients, ok := h.clients[message.receiverID]; ok {
				for client := range clients {
					select {
					case client.send <- message.data:
					default:
						close(client.send)
						delete(clients, client)
						if len(clients) == 0 {
							delete(h.clients, message.receiverID)
						}
					}
				}
			}
			h.mutex.RUnlock()
		}
	}
} 