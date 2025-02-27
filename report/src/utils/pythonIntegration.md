# Python Integration Guide for Network Monitoring Report

This document explains how to use Python to modify the HTML report template and generate PDF reports.

## Overview

The HTML template is designed to be easily modified by Python scripts. You can:

1. Open the HTML file
2. Modify content (text, data, charts)
3. Save the modified HTML
4. Convert to PDF (optional)

## Required Python Libraries

```python
pip install beautifulsoup4 weasyprint chart.js-python
```

## Basic Usage Example

```python
from bs4 import BeautifulSoup
import json
import weasyprint

# Load the HTML template
with open('index.html', 'r') as file:
    html_content = file.read()

# Parse the HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Update company and report information
soup.select_one('.company-name').string = "Your Company Name"
soup.select_one('.report-date').string = "April 18, 2025"
soup.select_one('.client-name').string = "Client Company Name"
soup.select_one('.report-period').string = "Q1 2025"

# Update chart data
# Find the chart placeholder and replace with actual chart data
cpu_chart_placeholder = soup.select_one('#cpu-chart-placeholder')
if cpu_chart_placeholder:
    # Create chart data in the format expected by Chart.js
    chart_data = {
        "type": "line",
        "data": {
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            "datasets": [
                {
                    "label": "Device 1",
                    "data": [65, 59, 80, 81, 56, 55],
                    "borderColor": "rgb(75, 192, 192)",
                    "tension": 0.1
                },
                # Add more datasets as needed
            ]
        }
    }
    # Replace placeholder with script to create chart
    chart_script = soup.new_tag('script')
    chart_script.string = f"new Chart(document.getElementById('cpu-chart'), {json.dumps(chart_data)});"
    cpu_chart_placeholder.replace_with(chart_script)

# Save the modified HTML
with open('modified_report.html', 'w') as file:
    file.write(str(soup))

# Convert to PDF (optional)
weasyprint.HTML('modified_report.html').write_pdf('network_report.pdf')
```

## Updating Different Sections

### Updating Text Content

```python
# Update executive summary
exec_summary = soup.select_one('.executive-summary')
exec_summary.string = "Your new executive summary text here."

# Update KPI values
soup.select_one('.network-availability-value').string = "99.9%"
soup.select_one('.tickets-resolved-value').string = "95%"
```

### Updating Charts

```python
# Find chart placeholders by their IDs and replace with actual chart data
chart_ids = ['cpu-chart', 'memory-chart', 'availability-chart', 'poe-chart', 'ticket-type-chart']

for chart_id in chart_ids:
    placeholder = soup.select_one(f'#{chart_id}-placeholder')
    if placeholder:
        # Load data for this specific chart
        chart_data = load_chart_data(chart_id)  # Your function to load data
        
        # Create chart element
        chart_canvas = soup.new_tag('canvas')
        chart_canvas['id'] = chart_id
        chart_canvas['width'] = '400'
        chart_canvas['height'] = '200'
        
        # Replace placeholder with canvas
        placeholder.replace_with(chart_canvas)
        
        # Add script to initialize chart
        chart_script = soup.new_tag('script')
        chart_script.string = f"new Chart(document.getElementById('{chart_id}'), {json.dumps(chart_data)});"
        soup.select_one('body').append(chart_script)
```

### Updating Tables

```python
# Update table data
table = soup.select_one('.kpi-table')
if table:
    rows = table.select('tbody tr')
    
    # Example: Update first row
    if len(rows) > 0:
        cells = rows[0].select('td')
        if len(cells) >= 5:
            cells[1].string = "45%"  # Current value
            cells[2].string = "48%"  # Previous value
            cells[3].string = "-3%"  # Change
            
            # Update status cell
            status_span = cells[4].select_one('span')
            status_span.string = "Good"
            status_span['class'] = "px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
```

### Adding Device Data with Pagination

```python
# Update device list for charts
devices_container = soup.select_one('.devices-container')
if devices_container:
    # Clear existing devices
    devices_container.clear()
    
    # Add your devices
    for device_id, device_name in your_devices_data.items():
        device_div = soup.new_tag('div')
        device_div['class'] = "flex items-center p-2 rounded-md cursor-pointer bg-white border border-gray-200"
        device_div['data-device-id'] = device_id
        
        color_div = soup.new_tag('div')
        color_div['class'] = "w-3 h-3 rounded-full mr-2"
        color_div['style'] = f"background-color: {get_color_for_device(device_id)};"
        
        name_span = soup.new_tag('span')
        name_span['class'] = "text-sm truncate"
        name_span.string = device_name
        
        device_div.append(color_div)
        device_div.append(name_span)
        devices_container.append(device_div)
```

## Complete Example

For a complete example that updates all sections of the report, see the `generate_report.py` file in this directory.

## Converting to PDF

```python
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

# Configure fonts
font_config = FontConfiguration()
css = CSS(string='''
    @page {
        size: A4;
        margin: 1cm;
    }
    body {
        font-family: Arial, sans-serif;
    }
''', font_config=font_config)

# Generate PDF
HTML('modified_report.html').write_pdf(
    'network_report.pdf',
    stylesheets=[css],
    font_config=font_config
)
```

## Sending the Report via Email

```python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import formatdate
from email import encoders

def send_email(send_from, send_to, subject, message, files=None,
              server="localhost", port=587, username='', password='',
              use_tls=True):
    """Send an email with PDF attachment"""
    
    msg = MIMEMultipart()
    msg['From'] = send_from
    msg['To'] = send_to
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject
    
    msg.attach(MIMEText(message))
    
    if files:
        for file in files:
            part = MIMEBase('application', "octet-stream")
            with open(file, 'rb') as file_obj:
                part.set_payload(file_obj.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition',
                           'attachment; filename="{}"'.format(os.path.basename(file)))
            msg.attach(part)
    
    smtp = smtplib.SMTP(server, port)
    if use_tls:
        smtp.starttls()
    if username:
        smtp.login(username, password)
    smtp.sendmail(send_from, send_to, msg.as_string())
    smtp.quit()

# Example usage
send_email(
    send_from='your-email@company.com',
    send_to='client@example.com',
    subject='Network Performance Report - Q1 2025',
    message='Please find attached the network performance report for Q1 2025.',
    files=['network_report.pdf'],
    server='smtp.company.com',
    username='your-email@company.com',
    password='your-password'
)
```