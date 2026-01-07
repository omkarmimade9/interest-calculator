# Android Interest Calculator App

## Overview

This is a native Android application built with Kotlin and Jetpack libraries for calculating Simple and Compound Interest. It provides an intuitive user interface for financial calculations.

## Project Structure

```
android/
├── build.gradle                 # Project-level Gradle file
├── AndroidManifest.xml          # App manifest configuration
├── MainActivity.kt              # Main activity with interest calculation logic
├── app/
│   └── build.gradle             # App module Gradle configuration
├── ANDROID_README.md            # This file
```

## Technology Stack

- **Language**: Kotlin
- **SDK Level**: Min 21 (Android 5.0), Target 34 (Android 14)
- **Build System**: Gradle
- **UI Framework**: Android AppCompat
- **Development Tools**: Android Studio

## Features

✅ Calculate Simple Interest using formula: SI = (P × R × T) / 100
✅ Calculate Compound Interest using formula: A = P(1 + R/100)^T
✅ Clean Material Design UI
✅ Real-time input validation
✅ Quick reset functionality
✅ Toast notifications for user feedback
✅ Responsive design for all screen sizes

## Setup Instructions

### Prerequisites

1. Install Android Studio (Latest version)
2. Android SDK (API level 21 or higher)
3. Kotlin support
4. Gradle 8.0+

### Steps to Build

1. Clone the repository
```bash
git clone https://github.com/omkarmimade9/interest-calculator.git
cd interest-calculator/android
```

2. Open in Android Studio
   - File > Open > Select the android folder

3. Sync Gradle Files
   - File > Sync Now

4. Build the Project
   - Build > Make Project

5. Run the App
   - Run > Run 'app' or press Shift + F10

## App Components

### MainActivity.kt

The main activity file containing:
- UI element initialization
- OnClickListener for Calculate button
- Interest calculation logic (both simple and compound)
- Input validation
- Reset functionality

### AndroidManifest.xml

Application manifest specifying:
- Package name: com.example.interestcalculator
- Activity configuration
- App metadata

### build.gradle Files

**Project-level (build.gradle)**
- Kotlin version: 1.9.10
- Android Gradle Plugin: 8.0.2
- Repositories and build dependencies

**App-level (app/build.gradle)**
- App configuration
- Dependencies
- Build types and flavors

## How to Use the App

1. **Launch the App**
   - Open Interest Calculator from your device

2. **Enter Details**
   - Principal Amount: Initial investment in dollars
   - Rate of Interest: Annual interest rate in percentage
   - Time Period: Duration in years
   - Select Interest Type: Simple or Compound

3. **Calculate**
   - Click the "Calculate" button
   - Results will display instantly
   - Shows both Interest and Total Amount

4. **Reset**
   - Click "Reset" to clear all fields and start over

## UI Components

- **EditText Fields**: For principal, rate, and time input
- **Spinner**: Dropdown for interest type selection
- **Calculate Button**: Triggers calculation
- **Reset Button**: Clears all inputs
- **TextView**: Displays results

## Error Handling

- Validates all inputs are filled
- Ensures positive values for principal and time
- Ensures non-negative value for rate
- Toast messages for user feedback
- Try-catch blocks for exception handling

## Next Steps to Complete

1. **Create Layout XML Files**
   - Create res/layout/activity_main.xml
   - Define all UI elements with proper IDs matching MainActivity.kt

2. **Create Resource Files**
   - strings.xml (app strings and labels)
   - colors.xml (color definitions)
   - styles.xml (app theme styles)

3. **Add App Icons and Assets**
   - Add icon_launcher.png to mipmap folders
   - Add ic_launcher_round.png

4. **Testing**
   - Unit tests for calculation logic
   - UI/Instrumentation tests

5. **Build and Release**
   - Create signed APK
   - Prepare for Play Store deployment

## Building APK

### Debug APK
```bash
./gradlew assembleDebug
```
Output: app/build/outputs/apk/debug/app-debug.apk

### Release APK
```bash
./gradlew assembleRelease
```
Output: app/build/outputs/apk/release/app-release.apk

## Testing the App

### Sample Test Cases

**Test 1: Simple Interest**
- Principal: $1000
- Rate: 5%
- Time: 2 years
- Expected Interest: $100
- Expected Total: $1100

**Test 2: Compound Interest**
- Principal: $1000
- Rate: 5%
- Time: 2 years
- Expected Interest: $102.50
- Expected Total: $1102.50

## Dependencies

```gradle
dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'com.google.android.material:material:1.10.0'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
```

## Troubleshooting

### Gradle Sync Issues
- Invalidate Caches > Restart
- Delete .gradle folder
- Check internet connection

### Build Errors
- Check Java version compatibility
- Ensure SDK is properly installed
- Verify Android Studio is updated

### Runtime Issues
- Check API level compatibility
- Verify all dependencies are added
- Check Manifest permissions

## Future Enhancements

- Add calculation history saved to SharedPreferences
- Multi-language support
- Dark mode theme
- Share results feature
- Charts and graphs for analysis
- Recurring interest calculation

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue on the GitHub repository.

---

**Created**: January 2026
**Maintained by**: omkarmimade9
