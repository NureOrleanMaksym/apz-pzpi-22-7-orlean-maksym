package com.example.roadsense.data.remote

import retrofit2.http.GET

interface ApiService {
    @GET("traffic")
    suspend fun getTrafficData(): TrafficResponse

    @GET("alerts")
    suspend fun getAlerts(): AlertsResponse
}

data class TrafficResponse(val status: String)
data class AlertsResponse(val alerts: List<String>)
