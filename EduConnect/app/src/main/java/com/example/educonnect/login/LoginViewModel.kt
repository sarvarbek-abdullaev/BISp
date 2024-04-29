package com.example.educonnect.login

import android.content.Context
import android.content.Context.MODE_PRIVATE
import android.content.SharedPreferences
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.educonnect.network.RetrofitInstance
import com.example.educonnect.network.requests.LoginRequest
import com.example.educonnect.network.responses.LoginResponse
import kotlinx.coroutines.launch
import okio.Timeout

class LoginViewModel(private val context: Context) : ViewModel() {
    val loginResponse: MutableLiveData<LoginResponse> by lazy {
        MutableLiveData<LoginResponse>()
    }

    private fun saveTokensToStorage(key: String, id: String) {
        val sharedPreferences: SharedPreferences =
            context.getSharedPreferences("authTokens", MODE_PRIVATE)
        val editor: SharedPreferences.Editor = sharedPreferences.edit()
        editor.putString(key, id)
        editor.apply()
    }

    fun login(loginRequest: LoginRequest) {
        viewModelScope.launch {
            try {
                val response: LoginResponse = RetrofitInstance.service.login(
                    loginRequest
                )

                loginResponse.value = response

                // Save tokens if login is successful
                if (response.id.isNotEmpty()) {
                    saveTokensToStorage("studentId", response.id)
                }

                if(response.backendTokens.accessToken.isNotEmpty()) {
                    saveTokensToStorage("accessToken", response.backendTokens.accessToken)
                }

                if(response.profile.firstName.isNotEmpty()) {
                    saveTokensToStorage("firstName", response.profile.firstName)
                }

                if(response.profile.lastName.isNotEmpty()) {
                    saveTokensToStorage("lastName", response.profile.lastName)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}