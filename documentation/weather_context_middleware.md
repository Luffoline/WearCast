## Weather Context Middleware

This middleware documents how raw weather data from external APIs is transformed into a structured and user-friendly weather context in WearCast.

It ensures that weather data is normalized and easy to use across the application, without requiring each route to handle raw API responses.

The resulting weather context is used throughout the app, for example to support dynamic outfit recommendations based on current weather conditions.