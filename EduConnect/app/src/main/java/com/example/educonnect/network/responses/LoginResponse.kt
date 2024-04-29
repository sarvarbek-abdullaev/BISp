package com.example.educonnect.network.responses

import com.google.gson.annotations.SerializedName

class LoginResponse {
    @SerializedName("id")
    val id: String = ""
    @SerializedName("profile")
    val profile : Profile = Profile()
    @SerializedName("backendTokens")
    val backendTokens: BackendTokens = BackendTokens()
}

class Profile {
    @SerializedName("id")
    val id: String = ""

    @SerializedName("firstName")
    val firstName: String = ""

    @SerializedName("lastName")
    val lastName: String = ""

    @SerializedName("email")
    val email: String = ""

    @SerializedName("role")
    val role: String = ""
}

class BackendTokens {
    @SerializedName("accessToken")
    val accessToken: String = ""
}