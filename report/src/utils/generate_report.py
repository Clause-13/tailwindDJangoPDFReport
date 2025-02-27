# update_chart_data(soup, 'poe-chart', {
#         'type': 'line',
#         'data': data['poe_data'],
#         'options': {
#             'responsive': True,
#             'plugins': {
#                 'legend': {
#                     'position': 'top',
#                 },
#                 'title': {
#                     'display': True,
#                     'text': 'PoE Capacity Utilization Trend'
#                 }
#             }
#         }
#     })
    
#     update_chart_data(soup, 'ticket-type-chart', {
#         'type': 'pie',
#         'data': data['ticket_type_data'],
#         'options': {
#             'responsive': True,
#             'plugins': {
#                 'legend': {
#                     'position': 'top',
#                 },
#                 'title': {
#                     'display': True,
#                     'text': 'Ticket Type Distribution'
#                 }
#             }
#         }
#     })
    
#     update_chart_data(soup, 'ticket-priority-chart', {
#         'type': 'bar',
#         'data': data['ticket_priority_data'],
#         'options': {
#             'responsive': True,
#             'plugins': {
#                 'legend': {
#                     'position': 'top',
#                 },
#                 'title': {
#                     'display': True,
#                     'text': 'Ticket Priority Distribution'
#                 }
#             }
#         }
#     })
    
#     # Update device lists
#     update_device_list(soup, data['devices'], '.network-devices-container')
#     update_device_list(soup, data['switches'], '.poe-switches-container')
#     update_device_list(soup, data['switches'], '.port-switches-container')
    
#     return soup

def generate_pdf(html_path, pdf_path):
    """Generate a PDF from the HTML report."""
    if not WEASYPRINT_AVAILABLE:
        print("WeasyPrint is not available. PDF generation skipped.")
        return False
    
    try:
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
        HTML(html_path).write_pdf(
            pdf_path,
            stylesheets=[css],
            font_config=font_config
        )
        return True
    except Exception as e:
        print(f"Error generating PDF: {e}")
        return False

def main():
    """Main function."""
    args = parse_args()
    
    # Generate sample data
    data = generate_sample_data()
    
    # Generate HTML report
    soup = generate_html_report(
        args.template,
        data,
        args.company,
        args.client,
        args.period
    )
    
    # Save HTML report
    with open(args.output, 'w', encoding='utf-8') as file:
        file.write(str(soup))
    
    print(f"HTML report generated: {args.output}")
    
    # Generate PDF if requested
    if args.pdf:
        pdf_path = os.path.splitext(args.output)[0] + '.pdf'
        if generate_pdf(args.output, pdf_path):
            print(f"PDF report generated: {pdf_path}")
        else:
            print("PDF generation failed.")

if __name__ == '__main__':
    main()