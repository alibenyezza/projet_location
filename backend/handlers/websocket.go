package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/user/location-platform/backend/models"
	ws "github.com/user/location-platform/backend/websocket"
	"gorm.io/gorm"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// Allow all origins for development
		// In production, restrict to specific origins
		return true
	},
}

// WebSocketHandler handles WebSocket connections
type WebSocketHandler struct {
	DB  *gorm.DB
	Hub *ws.Hub
}

// NewWebSocketHandler creates a new WebSocketHandler
func NewWebSocketHandler(db *gorm.DB, hub *ws.Hub) *WebSocketHandler {
	return &WebSocketHandler{
		DB:  db,
		Hub: hub,
	}
}

// HandleConnection handles new WebSocket connections
func (h *WebSocketHandler) HandleConnection(c *gin.Context) {
	// Get user from context (set by auth middleware)
	userInterface, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	user, ok := userInterface.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type"})
		return
	}

	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not upgrade connection"})
		return
	}

	// Create a new client
	client := ws.NewClient(h.Hub, user.ID, conn)

	// Register client with hub
	h.Hub.Register <- client

	// Start client goroutines
	go client.WritePump()
	go client.ReadPump()
} 