package com.example.roadsense.viewmodel

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.roadsense.data.model.Alert
import com.example.roadsense.data.repository.TrafficRepository
import kotlinx.coroutines.launch

class TrafficViewModel(private val repository: TrafficRepository) : ViewModel() {
    var trafficStatus = mutableStateOf("Loading...")
    var alerts = mutableStateOf<List<Alert>>(emptyList())

    fun fetchTrafficData() {
        viewModelScope.launch {
            try {
                val data = repository.fetchTrafficData()
                trafficStatus.value = data.status
                alerts.value = repository.fetchAlerts()
            } catch (e: Exception) {
                trafficStatus.value = "Error: ${e.message}"
                // Load cached data
                repository.getCachedTrafficData()?.let { trafficStatus.value = it.status }
                alerts.value = repository.getCachedAlerts()
            }
        }
    }
}
