package api

import (
	"github.com/gin-gonic/gin"
	"github.com/user/location-platform/backend/handlers"
	"github.com/user/location-platform/backend/middleware"
	"github.com/user/location-platform/backend/websocket"
	"gorm.io/gorm"
)

// SetupRoutes configures API routes
func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	// Create WebSocket hub and start it
	hub := websocket.NewHub()
	go hub.Run()

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(db)
	wsHandler := handlers.NewWebSocketHandler(db, hub)

	// API v1 routes
	v1 := router.Group("/api/v1")

	// Public routes
	auth := v1.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}

	// Protected routes
	protected := v1.Group("")
	protected.Use(middleware.AuthMiddleware(db))
	{
		// User routes (all authenticated users)
		protected.GET("/profile", func(c *gin.Context) {
			// TODO: Implement get profile
		})
		protected.PUT("/profile", func(c *gin.Context) {
			// TODO: Implement update profile
		})

		// WebSocket connection (all authenticated users)
		protected.GET("/ws", wsHandler.HandleConnection)

		// Messaging routes (all authenticated users)
		messages := protected.Group("/messages")
		{
			messages.GET("/conversations", func(c *gin.Context) {
				// TODO: Implement get conversations
			})
			messages.GET("/conversations/:id", func(c *gin.Context) {
				// TODO: Implement get conversation messages
			})
			messages.POST("/conversations/:id", func(c *gin.Context) {
				// TODO: Implement send message
			})
		}

		// Owner routes
		owner := protected.Group("/owner")
		owner.Use(middleware.RoleAuthMiddleware(middleware.RoleOwner))
		{
			owner.POST("/listings", func(c *gin.Context) {
				// TODO: Implement create listing
			})
			owner.GET("/listings", func(c *gin.Context) {
				// TODO: Implement get owner listings
			})
			owner.PUT("/listings/:id", func(c *gin.Context) {
				// TODO: Implement update listing
			})
			owner.DELETE("/listings/:id", func(c *gin.Context) {
				// TODO: Implement delete listing
			})
			owner.GET("/requests", func(c *gin.Context) {
				// TODO: Implement get tenant requests
			})
		}

		// Tenant routes
		tenant := protected.Group("/tenant")
		tenant.Use(middleware.RoleAuthMiddleware(middleware.RoleTenant))
		{
			tenant.POST("/requests", func(c *gin.Context) {
				// TODO: Implement create rental request
			})
			tenant.GET("/requests", func(c *gin.Context) {
				// TODO: Implement get tenant requests
			})
			tenant.PUT("/requests/:id", func(c *gin.Context) {
				// TODO: Implement update rental request
			})
			tenant.DELETE("/requests/:id", func(c *gin.Context) {
				// TODO: Implement delete rental request
			})
		}

		// Admin routes
		admin := protected.Group("/admin")
		admin.Use(middleware.RoleAuthMiddleware(middleware.RoleAdmin))
		{
			admin.GET("/users", func(c *gin.Context) {
				// TODO: Implement get all users
			})
			admin.GET("/listings", func(c *gin.Context) {
				// TODO: Implement get all listings
			})
			admin.PUT("/listings/:id/status", func(c *gin.Context) {
				// TODO: Implement approve/reject listing
			})
			admin.DELETE("/users/:id", func(c *gin.Context) {
				// TODO: Implement delete user
			})
		}
	}

	// Public listing routes
	listings := v1.Group("/listings")
	{
		listings.GET("", func(c *gin.Context) {
			// TODO: Implement get all approved listings
		})
		listings.GET("/:id", func(c *gin.Context) {
			// TODO: Implement get listing details
		})
		listings.GET("/search", func(c *gin.Context) {
			// TODO: Implement search listings
		})
	}
} 