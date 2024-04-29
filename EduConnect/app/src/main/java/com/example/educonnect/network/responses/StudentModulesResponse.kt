package com.example.educonnect.network.responses

import com.google.gson.annotations.SerializedName

class StudentModulesResponse {
    @SerializedName("academicYear")
    val academicYear: Int = 0
    @SerializedName("modules")
    val modules: List<Module> = listOf()
}

class Module {
    @SerializedName("id")
    val id: String = ""
    @SerializedName("code")
    val code: String = ""
    @SerializedName("name")
    val name: String = ""
    @SerializedName("status")
    val status: String = ""
    @SerializedName("description")
    val description: String = ""
    @SerializedName("createdAt")
    val createdAt: String = ""
    @SerializedName("updatedAt")
    val updatedAt: String = ""
    @SerializedName("level")
    val level: String = ""
    @SerializedName("courseId")
    val courseId: String = ""
    @SerializedName("teacherId")
    val teacherId: String? = null
    @SerializedName("course")
    val course: Course = Course()
}

class Course {
    @SerializedName("id")
    val id: String = ""
    @SerializedName("code")
    val code: String = ""
    @SerializedName("name")
    val name: String = ""
    @SerializedName("status")
    val status: String = ""
    @SerializedName("description")
    val description: String = ""
    @SerializedName("createdAt")
    val createdAt: String = ""
    @SerializedName("updatedAt")
    val updatedAt: String = ""
}