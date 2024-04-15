    package com.example.educonnect

    import android.util.Log
    import androidx.lifecycle.MutableLiveData
    import androidx.lifecycle.ViewModel
    import androidx.lifecycle.viewModelScope
    import com.example.educonnect.network.LoginRequest
    import com.example.educonnect.network.RetrofitInstance
    import com.example.educonnect.network.responses.LoginResponse
    import kotlinx.coroutines.launch

    class LoginViewModel() : ViewModel() {
        val loginResponse: MutableLiveData<LoginResponse> by lazy {
            MutableLiveData<LoginResponse>()
        }

        fun login(loginRequest: LoginRequest) {
            viewModelScope.launch {
                try {
                    val response: LoginResponse = RetrofitInstance.service.login(
                        loginRequest
                    )

                    loginResponse.postValue(response)

                    Log.d("Login_response", loginResponse.toString())

                    //Log.d("Login_response", response.toString())
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }