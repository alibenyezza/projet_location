package models

import (
	"time"

	"gorm.io/gorm"
)

// ListingStatus represents the status of a listing
type ListingStatus string

const (
	StatusPending  ListingStatus = "pending"
	StatusApproved ListingStatus = "approved"
	StatusRejected ListingStatus = "rejected"
)

// Listing represents a property listing in the system
type Listing struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Title       string         `gorm:"not null" json:"title"`
	Description string         `gorm:"type:text" json:"description"`
	Price       float64        `gorm:"not null" json:"price"`
	Address     string         `gorm:"not null" json:"address"`
	City        string         `gorm:"not null" json:"city"`
	State       string         `gorm:"not null" json:"state"`
	ZipCode     string         `gorm:"not null" json:"zip_code"`
	Latitude    float64        `json:"latitude"`
	Longitude   float64        `json:"longitude"`
	Bedrooms    int            `json:"bedrooms"`
	Bathrooms   float64        `json:"bathrooms"`
	Area        float64        `json:"area"`
	OwnerID     uint           `gorm:"not null" json:"owner_id"`
	Status      ListingStatus  `gorm:"not null;default:'pending'" json:"status"`
	Images      []ListingImage `gorm:"foreignKey:ListingID" json:"images"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

// ListingImage represents images for a property listing
type ListingImage struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ListingID uint      `gorm:"not null" json:"listing_id"`
	URL       string    `gorm:"not null" json:"url"`
	IsMain    bool      `gorm:"default:false" json:"is_main"`
	CreatedAt time.Time `json:"created_at"`
}

// ListingDTO is a data transfer object for listings with owner information
type ListingDTO struct {
	ID           uint          `json:"id"`
	Title        string        `json:"title"`
	Description  string        `json:"description"`
	Price        float64       `json:"price"`
	Address      string        `json:"address"`
	City         string        `json:"city"`
	State        string        `json:"state"`
	ZipCode      string        `json:"zip_code"`
	Latitude     float64       `json:"latitude"`
	Longitude    float64       `json:"longitude"`
	Bedrooms     int           `json:"bedrooms"`
	Bathrooms    float64       `json:"bathrooms"`
	Area         float64       `json:"area"`
	OwnerID      uint          `json:"owner_id"`
	Status       ListingStatus `json:"status"`
	Images       []ListingImage `json:"images"`
	OwnerName    string        `json:"owner_name"`
	CreatedAt    time.Time     `json:"created_at"`
	UpdatedAt    time.Time     `json:"updated_at"`
} 