package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/user/location-platform/backend/middleware"
	"github.com/user/location-platform/backend/models"
	"gorm.io/gorm"
)

// AuthHandler handles authentication related requests
type AuthHandler struct {
	DB *gorm.DB
}

// NewAuthHandler creates a new AuthHandler
func NewAuthHandler(db *gorm.DB) *AuthHandler {
	return &AuthHandler{
		DB: db,
	}
}

// RegisterRequest represents a user registration request
type RegisterRequest struct {
	Email      string         `json:"email" binding:"required,email"`
	Password   string         `json:"password" binding:"required,min=8"`
	FirstName  string         `json:"first_name" binding:"required"`
	LastName   string         `json:"last_name" binding:"required"`
	PhoneNumber string        `json:"phone_number"`
	Role       models.UserRole `json:"role" binding:"required"`
}

// LoginRequest represents a user login request
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// AuthResponse represents an authentication response
type AuthResponse struct {
	Token string           `json:"token"`
	User  models.PublicUser `json:"user"`
}

// Register handles user registration
// @Summary Register a new user
// @Description Register a new user with email and password
// @Tags auth
// @Accept json
// @Produce json
// @Param request body RegisterRequest true "Registration information"
// @Success 201 {object} AuthResponse "Registration successful"
// @Failure 400 {object} map[string]string "Bad request"
// @Failure 409 {object} map[string]string "Email already exists"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /auth/register [post]
func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if email already exists
	var existingUser models.User
	result := h.DB.Where("email = ?", req.Email).First(&existingUser)
	if result.RowsAffected > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	// Create user
	user := models.User{
		Email:       req.Email,
		Password:    req.Password, // Will be hashed by the BeforeSave hook
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		PhoneNumber: req.PhoneNumber,
		Role:        req.Role,
	}

	if err := h.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Generate JWT token
	token, err := middleware.GenerateToken(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusCreated, AuthResponse{
		Token: token,
		User:  user.ToPublicUser(),
	})
}

// Login handles user login
// @Summary Login a user
// @Description Login a user with email and password
// @Tags auth
// @Accept json
// @Produce json
// @Param request body LoginRequest true "Login information"
// @Success 200 {object} AuthResponse "Login successful"
// @Failure 400 {object} map[string]string "Bad request"
// @Failure 401 {object} map[string]string "Invalid credentials"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /auth/login [post]
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	var user models.User
	result := h.DB.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Validate password
	if !user.ValidatePassword(req.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	token, err := middleware.GenerateToken(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		User:  user.ToPublicUser(),
	})
} 