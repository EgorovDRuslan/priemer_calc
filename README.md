# Priemer & Intrak Points Calculator

A web-based application designed to help university students calculate their semester or annual weighted average grade (Priemer) and dormitory/scholarship points (Intrak Points).

The project runs entirely on the client side (in the browser) using HTML, CSS, and JavaScript. It does not require any backend server and does not transmit data over the network.

## Formulas Used

### 1. Priemer (Weighted Average)
$$\text{Priemer} = \frac{\sum (\text{Credits}_i \times \text{Coefficient}_i)}{\sum \text{Credits}_i}$$

### 2. Intrak Points
Maps the average grade ($1.0 \le x \le 3.0$) onto a $0 - 700$ points scale:
$$\text{Intrak Points} = 700 \times \frac{3.00 - \text{Average Grade}}{3.00 - 1.00}$$
