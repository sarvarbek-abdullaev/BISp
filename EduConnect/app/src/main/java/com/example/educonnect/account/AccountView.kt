import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.Icon
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.educonnect.AuthToken
import com.example.educonnect.login.restartActivity

@Composable
fun AccountView(firstName: String, lastName: String) {
    val context = LocalContext.current // Retrieve the context

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = Icons.Filled.AccountCircle,
            contentDescription = "Profile Icon",
            modifier = Modifier
                .size(120.dp)
                .padding(8.dp)
        )
        Text(text = "First Name: $firstName", color = Color.Black)
        Text(text = "Last Name: $lastName", color = Color.Black)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = {
            // Call clearToken method to logout
            AuthToken(context).clearToken()
            restartActivity(context) // Callback to notify logout
        }) {
            Text(text = "Logout")
        }
    }
}

@Preview
@Composable
fun AccountViewPreview() {
    AccountView(firstName = "John", lastName = "Doe")
}
