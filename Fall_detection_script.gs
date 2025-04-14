function doPost(e) {
  var sheet = SpreadsheetApp.openById('SHEET ID').getSheetByName("Sheet1");

  var timestamp = new Date();
  var event = e.parameter.event || "Unknown";
  var device = e.parameter.device_id || "ESP32";
  var user = e.parameter.user || "Unknown";
  var externalIp = e.parameter.external_ip || "Unknown";
  var latitude = e.parameter.latitude || "Unknown";
  var longitude = e.parameter.longitude || "Unknown";


  var rowData = [timestamp, device, event, user, externalIp, latitude, longitude];
  //var rssiString = "";  // Removed

  // Extract RSSI data  // Removed
  //var i = 0;
  //while (e.parameter['ssid_' + i]) {
  //  var ssid = e.parameter['ssid_' + i];
  //  var rssi = e.parameter['rssi_' + i];
  //  rssiString += ssid + ":" + rssi + " ";
  //  i++;
  //}
  //rssiString = rssiString.trim();
  rowData.push("No RSSI Data"); // Changed

  // Log to sheet
  sheet.appendRow(rowData);

  // Send email
  MailApp.sendEmail({
    to: "recipted@example.com",
    subject: "🚨 Fall Detected by " + device,
    body: "Fall event recorded: " + event + "\nTime: " + timestamp + "\nUser: " + user + "\nExternal IP: " + externalIp + "\nLatitude: " + latitude + "\nLongitude: " + longitude
  });

  return ContentService.createTextOutput("Logged and emailed");
}
