package com.example.educonnect

import AccountView
import StudentModulesView
import android.annotation.SuppressLint
import android.content.Context
import android.content.Context.MODE_PRIVATE
import android.content.SharedPreferences
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.List
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.educonnect.login.LoginView
import com.example.educonnect.login.restartActivity
import com.example.educonnect.ui.theme.EduConnectTheme

class MainActivity : ComponentActivity() {
    @SuppressLint("UnusedMaterialScaffoldPaddingParameter")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            EduConnectTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(), color = MaterialTheme.colors.background
                ) {
                    val authToken = AuthToken(LocalContext.current).getToken();
                    val navController = rememberNavController()

                    Scaffold(bottomBar = {
                        if (authToken != null) {
                            BottomNavigationBar(
                                items = listOf(
                                    BottomNavItem(
                                        name = stringResource(id = R.string.navigation_modules_title),
                                        route = "modules",
                                        icon = Icons.Default.List
                                    ),
                                    BottomNavItem(
                                        name = stringResource(id = R.string.navigation_account_title),
                                        route = "account",
                                        icon = Icons.Default.AccountBox
                                    )
                                ),
                                navController = navController,
                                onItemClick = { navController.navigate(it.route) }
                            )
                        }
                    }) {
                        Navigation(navController = navController, authToken = authToken)
                    }
                }
            }
        }
    }
}

@Composable
fun Navigation(navController: NavHostController, authToken: String?) {
    val startDestination = if (authToken == null) "login" else "modules"

    NavHost(navController = navController, startDestination = startDestination) {
        composable("modules") {
            StudentModulesView()
        }
        composable("account") {
            val firstAndLastName = AuthToken(LocalContext.current).getFirstAndLastName()

            AccountView(
                firstName = firstAndLastName.first,
                lastName = firstAndLastName.second
            )
        }

        composable("login") {
            LoginView()
        }
    }
}

@Composable
fun BottomNavigationBar(
    items: List<BottomNavItem>,
    navController: NavHostController,
    modifier: Modifier = Modifier,
    onItemClick: (BottomNavItem) -> Unit
) {
    val backStackEntry = navController.currentBackStackEntryAsState()

    BottomNavigation(
        modifier = modifier, backgroundColor = Color.LightGray, elevation = 5.dp
    ) {
        items.forEach { item ->
            val selected = item.route == backStackEntry.value?.destination?.route

            BottomNavigationItem(selected = selected,
                onClick = { onItemClick(item) },
                selectedContentColor = Color.Blue,
                unselectedContentColor = Color.DarkGray,
                icon = {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(imageVector = item.icon, contentDescription = item.name)
                        Text(
                            text = item.name, textAlign = TextAlign.Center, fontSize = 15.sp
                        )
                    }
                })
        }
    }
}

class AuthToken(private val context: Context) {
    fun getToken(): String? {
        val sharedPreferences: SharedPreferences =
            context.getSharedPreferences("authTokens", MODE_PRIVATE)
        return sharedPreferences.getString("studentId", null)
    }

    fun getFirstAndLastName(): Pair<String, String> {
        val sharedPreferences: SharedPreferences =
            context.getSharedPreferences("authTokens", MODE_PRIVATE)
        val firstName = sharedPreferences.getString("firstName", null)
        val lastName = sharedPreferences.getString("lastName", null)
        return Pair(firstName!!, lastName!!)
    }

    fun clearToken() {
        val sharedPreferences: SharedPreferences =
            context.getSharedPreferences("authTokens", MODE_PRIVATE)
        sharedPreferences.edit().clear().apply()
    }
}