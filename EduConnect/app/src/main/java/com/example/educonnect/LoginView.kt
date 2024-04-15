package com.example.educonnect

import android.content.Context
import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.educonnect.network.LoginRequest
import com.example.educonnect.network.responses.LoginResponse
import com.example.educonnect.ui.theme.EduConnectTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(viewModel: LoginViewModel = LoginViewModel()) {

    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var emailError by remember { mutableStateOf("") }
    var passwordError by remember { mutableStateOf("") }
    var showToast by remember { mutableStateOf(false) }
    var toastMessage by remember { mutableStateOf("") }

    val isProgressVisible = remember { mutableStateOf(false) }

    fun isEmailValid(email: String): Boolean {
        val emailRegex = Regex("^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,})+\$")
        return email.matches(emailRegex)
    }

    fun isPasswordValid(password: String): Boolean {
        return password.length >= 6
    }

    fun validateEmail(email: String) {
        emailError = when {
            email.isEmpty() -> "Email is required"
            !isEmailValid(email) -> "Invalid email format"
            else -> ""
        }
    }

    fun validatePassword(password: String) {
        passwordError = when {
            password.isEmpty() -> "Password is required"
            !isPasswordValid(password) -> "Password must be at least 6 characters"
            else -> ""
        }
    }

    fun isInputValid(): Boolean {
        validateEmail(email)
        validatePassword(password)
        return emailError.isEmpty() && passwordError.isEmpty()
    }

    val response by viewModel.loginResponse.observeAsState()

    if (showToast) {
        ToastMessage(toastMessage)
        showToast = false
    }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
//        AsyncImage(
//            model = "https://th.bing.com/th/id/OIP.8_4628wXA_gMHIx2otJO9QHaE8?rs=1&pid=ImgDetMain",
//            contentDescription = null,
//            modifier = Modifier.padding(30.dp)
//        )
        Image(
            painter = painterResource(id = R.drawable.logo),
            contentDescription = "Logo image",
            Modifier
                .width(350.dp)
                .height(150.dp)
        )
        Text(
            text = "Login to your account",
            modifier = Modifier.padding(30.dp),
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )

        OutlinedTextField(
            value = email,
            onValueChange = {
                email = it
                validateEmail(it)
            },
            label = { Text("Email address") },
            isError = emailError.isNotEmpty(),
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = {
                password = it
                validatePassword(it)
            },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            isError = passwordError.isNotEmpty(),
            singleLine = true,
        )

        Spacer(modifier = Modifier.height(32.dp))

        Button(
            onClick = {
                if (isInputValid()) {
                    isProgressVisible.value = true
                    viewModel.login(LoginRequest(email, password))
                } else {
                    if (!isEmailValid(email)) {
                        toastMessage = emailError
                        showToast = true
                    } else if (!isPasswordValid(password)) {
                        toastMessage = passwordError
                        showToast = true
                    }
                    Log.e("LoginScreen", "Invalid input")
                }
            }, modifier = Modifier.size(150.dp, 40.dp)
        ) {
            Text(text = "Login", fontSize = 16.sp)
        }

        TextButton(onClick = { /*TODO*/ }) {
            Text(text = "Forgot password?")
        }
    }

    response?.let {
        toastMessage = when {
            it.statusCode == 0 && it.id.isEmpty() -> {
                "Checking credentials"
            }

            it.statusCode == 404 -> {
                "User not found"
            }

            else -> {
                "Login successful"
            }
        }
        showToast = true
        isProgressVisible.value = false
    }

    if (isProgressVisible.value) {
        ProgressWidget(LocalContext.current)
    }
}

@Composable
private fun ProgressWidget(context: Context) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Transparent)
    ) {
        Text(
            modifier = Modifier
                .background(Color.Black)
                .padding(20.dp)
                .align(Alignment.Center),
            fontSize = 25.sp,
            text = "Checking credentials"
        )
    }
}

@Composable
fun ToastMessage(message: String) {
    Toast.makeText(LocalContext.current, message, Toast.LENGTH_SHORT).show()
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    EduConnectTheme {
        LoginScreen()
    }
}