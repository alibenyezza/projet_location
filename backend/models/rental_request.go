package models

import (
	"time"

	"gorm.io/gorm"
)

// RequestStatus represents the status of a rental request
type RequestStatus string

const (
	RequestStatusPending  RequestStatus = "pending"
	RequestStatusApproved RequestStatus = "approved"
	RequestStatusRejected RequestStatus = "rejected"
)

// RentalRequest represents a tenant's request for a property
type RentalRequest struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	TenantID     uint           `gorm:"not null" json:"tenant_id"`
	Budget       float64        `json:"budget"`
	MinBedrooms  int            `json:"min_bedrooms"`
	MinBathrooms float64        `json:"min_bathrooms"`
	PreferredCity string         `json:"preferred_city"`
	PreferredArea string         `json:"preferred_area"`
	Description  string         `gorm:"type:text" json:"description"`
	MoveInDate   *time.Time     `json:"move_in_date"`
	Status       RequestStatus  `gorm:"not null;default:'pending'" json:"status"`
	Messages     []Message      `json:"-"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// RentalRequestDTO is a data transfer object for rental requests with tenant information
type RentalRequestDTO struct {
	ID            uint          `json:"id"`
	TenantID      uint          `json:"tenant_id"`
	TenantName    string        `json:"tenant_name"`
	TenantEmail   string        `json:"tenant_email"`
	Budget        float64       `json:"budget"`
	MinBedrooms   int           `json:"min_bedrooms"`
	MinBathrooms  float64       `json:"min_bathrooms"`
	PreferredCity string        `json:"preferred_city"`
	PreferredArea string        `json:"preferred_area"`
	Description   string        `json:"description"`
	MoveInDate    *time.Time    `json:"move_in_date"`
	Status        RequestStatus `json:"status"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
} 