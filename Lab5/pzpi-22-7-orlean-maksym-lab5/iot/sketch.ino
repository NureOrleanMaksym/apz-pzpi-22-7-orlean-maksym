#include <Wire.h>                   // I2C Library
#include <Adafruit_GFX.h>           // OLED Library
#include <Adafruit_SSD1306.h>       // OLED Library
#include <Adafruit_MPU6050.h>       // MPU6050 Library
#include <WiFi.h>                   // Wi-Fi Library
#include <PubSubClient.h>           // MQTT Library

// OLED Display Settings
#define SCREEN_WIDTH 128    // OLED display width, in pixels
#define SCREEN_HEIGHT 64    // OLED display height, in pixels
#define OLED_RESET    -1    // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(OLED_RESET); // Declaring the display

// Accelerometer Settings
Adafruit_MPU6050 mpu;
sensors_event_t accelerometer, gyroscope, temp;
const float MOVEMENT_THRESHOLD = 1.2; // Threshold for detecting vehicle movement
float accMag;
int vehicleCount = 0;

// Traffic Sensor Settings
#define TRAFFIC_SENSOR_PIN 34  // Analog pin for traffic sensor (e.g., ultrasonic or IR sensor)
#define SAMPLING_INTERVAL 1000 // Interval for sampling traffic data
float trafficDensity;

// Wi-Fi credentials
const char* ssid = "Wokwi-GUEST";  // Network SSID
const char* password = "";         // Network password

// MQTT Broker Settings
const char* mqtt_server = "broker.hivemq.com"; // Public MQTT broker
const int mqtt_port = 1883;                    // Default MQTT port
const char* mqtt_user = "";                    // MQTT username (if needed)
const char* mqtt_password = "";                // MQTT password (if needed)
const char* mqtt_topic = "roadsense/traffic";  // Topic for RoadSense data

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void setup() {
  Serial.begin(115200);

  // Setup OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("OLED display not found!"));
    while (true);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  // Connect to Wi-Fi
  display.setCursor(0, 0);
  display.print("Connecting to WiFi...");
  display.display();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    display.setCursor(0, 10);
    display.print(".");
    display.display();
  }
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("WiFi connected");
  display.display();
  delay(2000);

  // Initialize MPU6050
  if (!mpu.begin()) {
    display.clearDisplay();
    display.setCursor(0, 0);
    display.print("MPU6050 Error!");
    display.display();
    while (true);
  }

  // Setup traffic sensor pin
  pinMode(TRAFFIC_SENSOR_PIN, INPUT);

  // Set up MQTT
  mqttClient.setServer(mqtt_server, mqtt_port);
  mqttClient.setCallback(mqttCallback);
  reconnectMQTT();
}

void loop() {
  // Ensure MQTT connection
  if (!mqttClient.connected()) {
    reconnectMQTT();
  }
  mqttClient.loop();

  static unsigned long startTime;
  if (millis() - startTime < SAMPLING_INTERVAL) {
    return;
  }
  startTime = millis();

  // Read traffic density from sensor (simulated as analog value)
  int sensorValue = analogRead(TRAFFIC_SENSOR_PIN);
  trafficDensity = map(sensorValue, 0, 4095, 0, 100); // Map to 0-100% density

  // Get accelerometer readings to detect vehicle movement
  mpu.getEvent(&accelerometer, &gyroscope, &temp);
  accMag = sqrt(sq(accelerometer.acceleration.x) + sq(accelerometer.acceleration.y) + sq(accelerometer.acceleration.z));

  // Detect vehicle presence (based on vibration/movement)
  if (accMag > MOVEMENT_THRESHOLD) {
    vehicleCount++;
  }

  // Determine traffic status
  String trafficStatus = trafficDensity > 70 ? "Heavy" : (trafficDensity > 30 ? "Moderate" : "Light");

  // Display data on OLED
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Traffic Density: ");
  display.print(trafficDensity);
  display.println("%");

  display.print("Vehicles: ");
  display.println(vehicleCount);

  display.print("Status: ");
  display.println(trafficStatus);

  display.display();

  // Send data to MQTT
  sendDataToMQTT(trafficDensity, vehicleCount, trafficStatus);
}

void sendDataToMQTT(float density, int vehicles, String status) {
  String payload = "{\"density\": " + String(density) + 
                   ", \"vehicles\": " + String(vehicles) + 
                   ", \"status\": \"" + status + "\"}";

  if (mqttClient.publish(mqtt_topic, payload.c_str())) {
    Serial.println("Data sent to MQTT: " + payload);
    displayMessage("Data sent to MQTT");
  } else {
    Serial.println("Failed to send data to MQTT.");
    displayMessage("Failed to send");
  }
}

// MQTT callback function
void mqttCallback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message received in topic: ");
  Serial.print(topic);
  String messageStr;
  for (int i = 0; i < length; i++) {
    messageStr += (char)message[i];
  }
  Serial.println(messageStr);
  displayMessage("Alert: " + messageStr); // Display incoming alerts
}

// Reconnect to MQTT broker
void reconnectMQTT() {
  while (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT...");
    if (mqttClient.connect("ESP32RoadSense", mqtt_user, mqtt_password)) {
      Serial.println("MQTT connected");
      mqttClient.subscribe(mqtt_topic);
      displayMessage("MQTT connected");
    } else {
      Serial.print("Failed to connect, rc=");
      Serial.print(mqttClient.state());
      delay(5000);
    }
  }
}

// Display message on OLED screen
void displayMessage(String message) {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print(message);
  display.display();
}