package models

import (
	"gorm.io/gorm"
)

// AutoMigrate automatically migrates the database schema for all models
func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&User{},
		&Listing{},
		&ListingImage{},
		&RentalRequest{},
		&Conversation{},
		&Message{},
	)
} 