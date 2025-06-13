package com.example.roadsense.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.roadsense.data.model.Alert
import com.example.roadsense.data.model.TrafficData

@Database(entities = [TrafficData::class, Alert::class], version = 1)
abstract class TrafficDatabase : RoomDatabase() {
    abstract fun trafficDao(): TrafficDao
}
