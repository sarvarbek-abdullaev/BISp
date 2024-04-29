import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.educonnect.network.responses.Module
import com.example.educonnect.studentModules.StudentModulesViewModel

@Composable
fun StudentModulesView(viewModel: StudentModulesViewModel = StudentModulesViewModel(LocalContext.current)) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center, content = {
        val modules by viewModel.studentModulesResponse.observeAsState()
        val isLoading by viewModel.isLoading.observeAsState()

        if (isLoading == true) {
            // Show a loading indicator if data is loading
            CircularProgressIndicator(
                modifier = Modifier.align(Alignment.Center),
                color = MaterialTheme.colors.primary // You can change the color to match your theme
            )
        } else {
            Surface(modifier = Modifier.fillMaxSize(), color = Color.Transparent) {
                LazyColumn(
                    modifier = Modifier.fillMaxSize()
                ) {
                    modules?.let {
                        items(items = it.toList(), itemContent = { item ->
                            item.modules?.let { modules ->
                                modules.forEach { module ->
                                    ModuleCard(module = module)
                                }
                            }
                        })
                    }
                }
            }
        }
    })
}

@Composable
fun ModuleCard(module: Module) {
    Surface(
        modifier = Modifier
            .padding(8.dp) // Apply padding here
            .fillMaxWidth(0.5f),
        color = Color(0xFF81D4FA), // Set blue background color using RGB (hex: #81D4FA)
        elevation = 4.dp,
        shape = RoundedCornerShape(16.dp), // Make rounded corners
        border = BorderStroke(1.dp, Color.LightGray)
    ) {
        Column(
            modifier = Modifier.padding(16.dp) // Increase padding
        ) {
            Name(name = module.name)
            Description(description = module.code)
            Description(description = module.level)
            Category(name = module.course.name)
            Description(description = module.description)
        }
    }
}

@Composable
fun Name(name: String) {
    Text(
        text = name,
        style = MaterialTheme.typography.h6,
        color = Color.Black // Set text color to black
    )
}

@Composable
fun Category(name: String) {
    Text(
        text = name,
        style = MaterialTheme.typography.body1,
        color = Color.DarkGray // Set text color to dark gray
    )
}

@Composable
fun Description(description: String) {
    Text(
        text = description,
        style = MaterialTheme.typography.body2,
        color = Color.Black // Set text color to black
    )
}
