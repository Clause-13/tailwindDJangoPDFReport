# Network Monitoring Report Template

A professional, interactive HTML template for network monitoring reports that can be easily modified with Python and converted to PDF.

## Features

- **Professional Design**: Corporate-ready layout with company branding
- **Interactive Charts**: Visualize network performance, PoE utilization, and ticket metrics
- **Paginated Device Selection**: Handle large numbers of devices with pagination
- **PDF Export**: Convert reports to PDF for easy sharing
- **Python Integration**: Simple API for programmatically updating report content

## Getting Started

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Python Integration

The template is designed to be easily modified by Python scripts. See the utilities in the `src/utils` directory:

- `generate_report.py`: Example script to generate a report from the template
- `email_report.py`: Example script to email the generated report

### Basic Usage

```bash
# Generate an HTML report
python src/utils/generate_report.py --template index.html --output report.html

# Generate a PDF report
python src/utils/generate_report.py --template index.html --output report.html --pdf

# Email the report
python src/utils/email_report.py --report report.pdf --recipient client@example.com
```

## Customization

### Company Branding

- Replace the logo in the header
- Update company colors in the Tailwind configuration
- Modify the header and footer content

### Report Sections

The report includes the following sections:

1. **Executive Summary**: High-level overview of network performance
2. **Network Performance**: CPU, memory, and availability metrics
3. **PoE Utilization**: Power over Ethernet capacity and consumption
4. **Switch Port Changes**: Port utilization and recent changes
5. **Ticket Analysis**: Support ticket metrics and flagged tickets

## Dependencies

- React for UI components
- Chart.js for data visualization
- html2pdf.js for PDF export
- Tailwind CSS for styling
- Lucide React for icons

## Python Requirements

For report generation and PDF conversion:

- BeautifulSoup4 for HTML parsing
- WeasyPrint for PDF generation (optional)

## License

MIT