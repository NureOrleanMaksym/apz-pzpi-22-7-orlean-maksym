package com.example.roadsense.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "traffic_data")
data class TrafficData(
    @PrimaryKey val id: String = "1",
    val status: String,
    val timestamp: Long
)