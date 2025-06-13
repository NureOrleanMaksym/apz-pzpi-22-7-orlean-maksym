package com.example.roadsense.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import com.example.roadsense.data.model.Alert
import com.example.roadsense.data.model.TrafficData

@Dao
interface TrafficDao {
    @Insert
    suspend fun insertTrafficData(data: TrafficData)

    @Insert
    suspend fun insertAlerts(alerts: List<Alert>)

    @Query("SELECT * FROM traffic_data WHERE id = '1'")
    suspend fun getTrafficData(): TrafficData?

    @Query("SELECT * FROM alerts ORDER BY timestamp DESC")
    suspend fun getAlerts(): List<Alert>
}
