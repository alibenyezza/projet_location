package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// UserRole defines user roles in the system
type UserRole string

const (
	RoleAdmin     UserRole = "admin"
	RoleOwner     UserRole = "owner"
	RoleTenant    UserRole = "tenant"
)

// User represents a user in the system
type User struct {
	ID             uint           `gorm:"primaryKey" json:"id"`
	Email          string         `gorm:"uniqueIndex;not null" json:"email"`
	Password       string         `gorm:"not null" json:"-"` // Password is not exposed in JSON
	FirstName      string         `gorm:"not null" json:"first_name"`
	LastName       string         `gorm:"not null" json:"last_name"`
	PhoneNumber    string         `json:"phone_number"`
	Role           UserRole       `gorm:"not null;default:'tenant'" json:"role"`
	ProfilePicture string         `json:"profile_picture"`
	Bio            string         `json:"bio"`
	IsVerified     bool           `gorm:"default:false" json:"is_verified"`
	Listings       []Listing      `gorm:"foreignKey:OwnerID" json:"-"`
	RentalRequests []RentalRequest `gorm:"foreignKey:TenantID" json:"-"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeSave hashes the user password before saving to database
func (u *User) BeforeSave(tx *gorm.DB) error {
	if u.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		u.Password = string(hashedPassword)
	}
	return nil
}

// ValidatePassword validates the provided password against the stored hash
func (u *User) ValidatePassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// PublicUser contains only the public information of a user
type PublicUser struct {
	ID             uint     `json:"id"`
	Email          string   `json:"email"`
	FirstName      string   `json:"first_name"`
	LastName       string   `json:"last_name"`
	Role           UserRole `json:"role"`
	ProfilePicture string   `json:"profile_picture"`
	Bio            string   `json:"bio"`
	IsVerified     bool     `json:"is_verified"`
}

// ToPublicUser converts a User to a PublicUser
func (u *User) ToPublicUser() PublicUser {
	return PublicUser{
		ID:             u.ID,
		Email:          u.Email,
		FirstName:      u.FirstName,
		LastName:       u.LastName,
		Role:           u.Role,
		ProfilePicture: u.ProfilePicture,
		Bio:            u.Bio,
		IsVerified:     u.IsVerified,
	}
} 