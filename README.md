# ESP32 Fall Detection System

An ESP32-based fall detection system using the MPU6050 accelerometer and gyroscope. When a fall is detected, it triggers an audible alert, sends a notification via Google Apps Script, logs the data to ThingSpeak, and captures the device's external IP and geolocation.

## 🛠 Features

- Real-time fall detection using motion sensors
- Audible buzzer + LED alert on fall
- Sends alerts to a Google Apps Script endpoint
- Logs fall data to [ThingSpeak](https://thingspeak.com/)
- Fetches external IP and geolocation

---

## 🔌 Hardware Requirements

- ESP32 Development Board  
- MPU6050 Accelerometer + Gyroscope module  
- Buzzer  
- LED  
- Resistors (if needed)  
- Breadboard and jumper wires  

---

## 📦 Libraries Used

- [`Wire.h`](https://www.arduino.cc/en/reference/wire)
- [`Adafruit_MPU6050.h`](https://github.com/adafruit/Adafruit_MPU6050)
- [`Adafruit_Sensor.h`](https://github.com/adafruit/Adafruit_Sensor)
- [`WiFi.h`](https://github.com/espressif/arduino-esp32/tree/master/libraries/WiFi)
- [`HTTPClient.h`](https://github.com/espressif/arduino-esp32/tree/master/libraries/HTTPClient)

---

## 📡 Configuration

Before uploading the code, update the following placeholders in the `.ino` file:

```cpp
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
const char* scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
const char* thingSpeakApiKey = "YOUR_THINGSPEAK_API_KEY";
```
## 📈 How It Works

### 1. Sensor Data Collection
Uses **MPU6050** to collect accelerometer and gyroscope data.

### 2. Fall Detection Logic
A fall is suspected if:
- Low acceleration (e.g., impact)
- High gyroscopic change (sudden movement)

A fall is confirmed if:
- After 3 seconds, the tilt angle > 45°.

### 3. On Fall Detection
- Buzzer + LED alert  
- Sends alert to **Google Apps Script**  
- Logs data to **ThingSpeak**  
- Captures **external IP** and **location** (via `ip-api.com`)

---

## 🌍 Geolocation

The device fetches:
- **External IP** from [`http://api.ipify.org`](http://api.ipify.org)
- **Latitude & Longitude** from [`http://ip-api.com/json/<ip>`](http://ip-api.com/json/)

---

## 📤 Google Apps Script (Optional)

To receive alerts via HTTP POST, create a simple Google Apps Script web app:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.openById("SPREADSHEET_ID").getActiveSheet();
  sheet.appendRow([
    new Date(),
    e.parameter.event,
    e.parameter.device_id,
    e.parameter.user,
    e.parameter.external_ip,
    e.parameter.latitude,
    e.parameter.longitude
  ]);
  return ContentService.createTextOutput("Success");
}
```
## 🚀 Deploy as Web App

To deploy your Google Apps Script:

**Steps:**
- Go to **Deploy** > **Manage Deployments** > **New Deployment**
- Choose **Web App**
- Set appropriate permissions and deploy the script

---

## 📊 ThingSpeak Fields Used

| Field     | Description             |
|-----------|-------------------------|
| Field 1   | Acceleration Z-axis     |
| Field 2   | Gyroscope Y-axis        |
| Field 3   | Fall status (0 = no fall, 1 = fall detected) |
| Field 4   | User ID (e.g., Rohit)   |

---

## 🧠 Additional Notes

- Uses a **sliding window** (size 5) to smooth incoming sensor data.
- Handles **HTTP redirections** from Google Apps Script responses.
- Designed to be **easily extendable** for additional alert methods like **SMS** or **email notifications**.


