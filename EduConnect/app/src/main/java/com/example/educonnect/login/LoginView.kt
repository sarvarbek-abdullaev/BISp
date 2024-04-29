package com.example.educonnect.login

import android.content.Context
import android.content.Intent
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
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.material.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.educonnect.MainActivity
import com.example.educonnect.R
import com.example.educonnect.network.requests.LoginRequest


@Composable
//fun LoginView(context: Context, viewModel: LoginViewModel = LoginViewModel(context), onLogin: (Context) -> Unit) {
fun LoginView(viewModel: LoginViewModel = LoginViewModel(LocalContext.current)) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var emailError by remember { mutableStateOf("") }
    var passwordError by remember { mutableStateOf("") }
    var showToast by remember { mutableStateOf(false) }
    var toastMessage by remember { mutableStateOf("") }

    val isProgressVisible = remember { mutableStateOf(false) }



    fun isEmailValid(email: String): Boolean {
        val emailRegex = Regex("^([a-zA-Z0-9_+.-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})\$")
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
            it.id.isEmpty() -> {
                "Checking credentials"
            }
            it.profile.role.isNotEmpty() -> {
                "Login successful"
            }
            else -> {
                "User not found"
            }
        }
        showToast = true
        isProgressVisible.value = false

        ProgressWidget(isVisible = isProgressVisible.value)
    }
}

fun restartActivity(context: Context) {
    val intent = Intent(context, MainActivity::class.java)
    intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK)
    context.startActivity(intent)
}

@Composable
private fun ProgressWidget(isVisible: Boolean) {
    if (isVisible) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Blue.copy(alpha = 0.5f)),
            contentAlignment = Alignment.Center
        ) {
            CircularProgressIndicator()
        }
    } else {
        // Invoke onLogin when the progress is not visible
        restartActivity(LocalContext.current)
    }
}

@Composable
fun ToastMessage(message: String) {
    Toast.makeText(LocalContext.current, message, Toast.LENGTH_SHORT).show()
}

//@Preview(showBackground = true)
//@Composable
//fun GreetingPreview() {
//    EduConnectTheme {
//        LoginView()
//    }
//}