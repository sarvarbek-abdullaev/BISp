package com.example.educonnect.studentModules

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.educonnect.AuthToken
import com.example.educonnect.network.RetrofitInstance
import com.example.educonnect.network.responses.StudentModulesResponse
import kotlinx.coroutines.launch

class StudentModulesViewModel(private val context: Context) : ViewModel() {
    val studentModulesResponse: MutableLiveData<List<StudentModulesResponse>> by lazy {
        MutableLiveData<List<StudentModulesResponse>>()
    }

    val isLoading = MutableLiveData<Boolean>()

    private val studentId = AuthToken(context).getToken();

    init {
        getStudentModules()
    }

    private fun getStudentModules() {
        isLoading.value = true
        viewModelScope.launch {
            try {
                if(studentId.toString().isNotEmpty()) {
                    val response: List<StudentModulesResponse> = RetrofitInstance.service.getStudentModules(
                        studentId.toString()
                    );

                    studentModulesResponse.value = response;
                }
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                isLoading.value = false
            }
        }
    }
}