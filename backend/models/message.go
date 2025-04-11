package models

import (
	"time"

	"gorm.io/gorm"
)

// MessageType defines the type of message
type MessageType string

const (
	MessageTypeText MessageType = "text"
	MessageTypeImage MessageType = "image"
)

// Conversation represents a chat conversation between users
type Conversation struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	User1ID      uint           `gorm:"not null" json:"user1_id"`
	User2ID      uint           `gorm:"not null" json:"user2_id"`
	ListingID    *uint          `json:"listing_id"`
	RequestID    *uint          `json:"request_id"`
	LastMessage  string         `json:"last_message"`
	LastSentAt   *time.Time     `json:"last_sent_at"`
	Messages     []Message      `gorm:"foreignKey:ConversationID" json:"-"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// Message represents a chat message in the system
type Message struct {
	ID             uint           `gorm:"primaryKey" json:"id"`
	ConversationID uint           `gorm:"not null" json:"conversation_id"`
	SenderID       uint           `gorm:"not null" json:"sender_id"`
	ReceiverID     uint           `gorm:"not null" json:"receiver_id"`
	Content        string         `gorm:"type:text;not null" json:"content"`
	Type           MessageType    `gorm:"not null;default:'text'" json:"type"`
	IsRead         bool           `gorm:"default:false" json:"is_read"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// ConversationDTO is a data transfer object for conversations with user information
type ConversationDTO struct {
	ID             uint       `json:"id"`
	OtherUserID    uint       `json:"other_user_id"`
	OtherUserName  string     `json:"other_user_name"`
	OtherUserImage string     `json:"other_user_image"`
	ListingID      *uint      `json:"listing_id"`
	ListingTitle   string     `json:"listing_title"`
	RequestID      *uint      `json:"request_id"`
	LastMessage    string     `json:"last_message"`
	LastSentAt     *time.Time `json:"last_sent_at"`
	UnreadCount    int        `json:"unread_count"`
	CreatedAt      time.Time  `json:"created_at"`
}

// MessageDTO is a data transfer object for messages with sender information
type MessageDTO struct {
	ID           uint       `json:"id"`
	SenderID     uint       `json:"sender_id"`
	SenderName   string     `json:"sender_name"`
	SenderImage  string     `json:"sender_image"`
	ReceiverID   uint       `json:"receiver_id"`
	Content      string     `json:"content"`
	Type         MessageType `json:"type"`
	IsRead       bool       `json:"is_read"`
	CreatedAt    time.Time  `json:"created_at"`
} 