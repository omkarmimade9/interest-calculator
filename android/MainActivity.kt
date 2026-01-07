package com.example.interestcalculator

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import kotlin.math.pow

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        val principalInput = findViewById<EditText>(R.id.principal)
        val rateInput = findViewById<EditText>(R.id.rate)
        val timeInput = findViewById<EditText>(R.id.time)
        val typeSpinner = findViewById<Spinner>(R.id.type)
        val calculateBtn = findViewById<Button>(R.id.calculateBtn)
        val resetBtn = findViewById<Button>(R.id.resetBtn)
        val resultTextView = findViewById<TextView>(R.id.result)
        
        calculateBtn.setOnClickListener {
            try {
                val principal = principalInput.text.toString().toDouble()
                val rate = rateInput.text.toString().toDouble()
                val time = timeInput.text.toString().toDouble()
                val type = typeSpinner.selectedItem.toString()
                
                if (principal <= 0 || rate < 0 || time <= 0) {
                    Toast.makeText(this, "Please enter valid values", Toast.LENGTH_SHORT).show()
                    return@setOnClickListener
                }
                
                val (interest, total) = if (type == "Simple Interest") {
                    val interest = (principal * rate * time) / 100
                    val total = principal + interest
                    Pair(interest, total)
                } else {
                    val total = principal * (1 + rate / 100).pow(time)
                    val interest = total - principal
                    Pair(interest, total)
                }
                
                resultTextView.visibility = TextView.VISIBLE
                resultTextView.text = String.format(
                    "Interest: $%.2f\\nTotal Amount: $%.2f",
                    interest, total
                )
            } catch (e: Exception) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show()
            }
        }
        
        resetBtn.setOnClickListener {
            principalInput.text.clear()
            rateInput.text.clear()
            timeInput.text.clear()
            typeSpinner.setSelection(0)
            resultTextView.visibility = TextView.GONE
        }
    }
}
