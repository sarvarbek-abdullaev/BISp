package com.example.educonnect.network

import com.example.educonnect.network.requests.LoginRequest
import com.example.educonnect.network.responses.LoginResponse
import com.example.educonnect.network.responses.StudentModulesResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface EduConnectService {
    @POST("auth/login")
    suspend fun login(
        @Body loginRequest: LoginRequest
    ): LoginResponse

    @GET("students/{student_id}/modules")
    suspend fun getStudentModules(
        @Path("student_id") student_id: String,
    ): List<StudentModulesResponse>
}


