package com.example.roadsense.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.roadsense.viewmodel.TrafficViewModel

@Composable
fun MainScreen(navController: NavController, viewModel: TrafficViewModel = viewModel()) {
    val trafficStatus by viewModel.trafficStatus
    val alerts by viewModel.alerts

    LaunchedEffect(Unit) {
        viewModel.fetchTrafficData()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "RoadSense Traffic Monitor",
            style = MaterialTheme.typography.headlineMedium
        )
        Button(onClick = { viewModel.fetchTrafficData() }) {
            Text("Refresh Traffic Data")
        }
        Text(
            text = "Current Traffic Status: $trafficStatus",
            style = MaterialTheme.typography.bodyLarge
        )
        Button(onClick = { navController.navigate("map") }) {
            Text("View Map")
        }
        Text(
            text = "Alerts:",
            style = MaterialTheme.typography.headlineSmall
        )
        LazyColumn {
            items(alerts) { alert ->
                Text(
                    text = alert.message,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(8.dp)
                )
            }
        }
    }
}
