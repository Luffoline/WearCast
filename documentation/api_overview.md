
//----------------USER ACCOUNTS---------------------

Create user:
    POST /auth/signup
        IF email is valid AND password is valid AND acceptTos = true {
            CREATE new user
        } ELSE {
            RETURN error
        }


Log in:
    POST /auth/login
        IF email + password combo exists {
            RETURN user session
        } ELSE {
            RETURN invalid credentials
        }


Current session:
    GET /auth/me
        RETURN session user OR null


Edit own user:
    PUT /auth/me
        REQUIRE user is authenticated

        UPDATE user preferences
        RETURN updated user


Delete own user:
    DELETE /auth/me
        REQUIRE user is authenticated

        DELETE user account
        CLEAR session
        RETURN success



//----------------LOCATION & WEATHER---------------------

Get weather by location:
    GET /weather
        REQUIRE user is authenticated
        REQUIRE location permission granted

        FETCH weather based on latitude & longitude
        RETURN weather data


Update user location:
    POST /location
        REQUIRE user is authenticated

        SAVE current user location
        RETURN success



//----------------USER PREFERENCES---------------------

Update clothing preferences:
    PUT /preferences
        REQUIRE user is authenticated

        UPDATE temperature tolerance and clothing style
        RETURN updated preferences


Get clothing recommendation:
    GET /recommendation
        REQUIRE user is authenticated

        USE weather + preferences
        RETURN clothing suggestion
