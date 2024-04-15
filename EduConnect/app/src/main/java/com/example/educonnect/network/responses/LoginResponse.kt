package com.example.educonnect.network.responses

import com.google.gson.annotations.SerializedName

class LoginResponse {
    @SerializedName("statusCode")
    val statusCode: Int = 0
    @SerializedName("message")
    val message: String = ""
    @SerializedName("id")
    val id: String = ""
    @SerializedName("profile")
    val profile : Profile = Profile()
    @SerializedName("backendTokens")
    val backendTokens: BackendTokens = BackendTokens()
}

class Profile {
    @SerializedName("id")
    val firstName: String = ""
    @SerializedName("profile")
    val lastName: String = ""
    @SerializedName("backendTokens")
    val email: String = ""
    @SerializedName("role")
    val role: String = ""
}

class BackendTokens {
    @SerializedName("accessToken")
    val accessToken: String = ""
}