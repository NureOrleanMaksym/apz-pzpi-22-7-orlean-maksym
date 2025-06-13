package com.example.roadsense.data.repository

import com.example.roadsense.data.local.TrafficDao
import com.example.roadsense.data.model.Alert
import com.example.roadsense.data.model.TrafficData
import com.example.roadsense.data.remote.ApiService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class TrafficRepository(
    private val apiService: ApiService,
    private val trafficDao: TrafficDao
) {
    suspend fun fetchTrafficData(): TrafficData {
        return withContext(Dispatchers.IO) {
            val response = apiService.getTrafficData()
            val trafficData = TrafficData(status = response.status, timestamp = System.currentTimeMillis())
            trafficDao.insertTrafficData(trafficData)
            trafficData
        }
    }

    suspend fun fetchAlerts(): List<Alert> {
        return withContext(Dispatchers.IO) {
            val response = apiService.getAlerts()
            val alerts = response.alerts.map {
                Alert(message = it, timestamp = System.currentTimeMillis())
            }
            trafficDao.insertAlerts(alerts)
            alerts
        }
    }

    fun getCachedTrafficData() = trafficDao.getTrafficData()
    fun getCachedAlerts() = trafficDao.getAlerts()
}
