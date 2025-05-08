import matplotlib.pyplot as plt
import numpy as np
from matplotlib.table import Table
import matplotlib as mpl

# Increase font size for better visibility
mpl.rcParams['font.size'] = 12

# Set up the figure with larger dimensions
plt.figure(figsize=(14, 7), dpi=150)
ax = plt.gca()
ax.set_axis_off()
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)

# Define NutriFit colors
nutrifit_green = '#4CAF50'
nutrifit_blue = '#2196F3'
nutrifit_header_green = '#1B5E20'

# Test case data
data = [
    ["Nutrition Record\nAddition", "Add New\nNutrition Record", 
     "1. Fill add record form\n2. Submit", 
     "Record added, success\nmessage shown", 
     "Record added, success\nmessage shown", 
     "Pass", 
     "Nutrient\nvalidation"],
    
    ["Nutrition Record\nUpdate", "Update Existing\nNutrition Record", 
     "1. Select record\n2. Edit nutrient values\n3. Submit", 
     "Record updated, success\nmessage shown", 
     "Record updated, success\nmessage shown", 
     "Pass", 
     "Validation,\naudit trail"],
    
    ["Nutrition Record\nDeletion", "Delete\nNutrition Record", 
     "1. Select record\n2. Confirm deletion", 
     "Record deleted, success\nmessage shown", 
     "Record deleted, success\nmessage shown", 
     "Pass", 
     "Confirmation\ndialog, data\nintegrity check"]
]

# Column labels
columns = ["Feature", "Test Case", "Steps to Execute Test Case", 
          "Expected Output", "Actual Output", "Status", "More Information"]

# Number of rows and columns
nrows, ncols = len(data) + 1, len(columns)

# Create the table with explicit positioning
table = Table(ax, bbox=[0.05, 0.05, 0.9, 0.75])

# Add header cells
for j, column in enumerate(columns):
    cell = table.add_cell(0, j, 1, 1, text=column, 
                         loc='center', facecolor=nutrifit_header_green, 
                         edgecolor='white')
    cell.get_text().set_color('white')
    cell.get_text().set_fontweight('bold')
    cell.get_text().set_fontsize(12)  # Explicit font size

# Add data cells
for i, row in enumerate(data):
    for j, text in enumerate(row):
        # Set different colors based on column and status
        if j == 5:  # Status column
            if text.lower() == "pass":
                cell_color = "#E8F5E9"  # Light green for pass
                text_color = "#2E7D32"  # Dark green text
                text_weight = 'bold'
            else:
                cell_color = "#FFEBEE"  # Light red for fail
                text_color = "#C62828"  # Dark red text
                text_weight = 'bold'
        elif j == 0:  # Feature column
            cell_color = "#E3F2FD"  # Light blue
            text_color = "#1565C0"  # Dark blue text
            text_weight = 'normal'
        else:
            cell_color = "white"
            text_color = "black"
            text_weight = 'normal'
        
        # Add the cell
        cell = table.add_cell(i+1, j, 1, 1, text=text, 
                             loc='center', facecolor=cell_color, 
                             edgecolor='#BDBDBD')
        cell.get_text().set_color(text_color)
        cell.get_text().set_fontweight(text_weight)
        cell.get_text().set_fontsize(10)  # Explicit font size

# Adjust column widths - wider for steps and test case descriptions
colWidths = [0.15, 0.15, 0.2, 0.15, 0.15, 0.08, 0.12]
for j, width in enumerate(colWidths):
    for i in range(nrows):
        table[i, j].set_width(width)

# Adjust table appearance
table.auto_set_font_size(False)
table.set_fontsize(10)
table.scale(1, 1.8)  # Increase row heights

# Add title
plt.suptitle('NutriFit - Sprint 3 Functional Test Cases', 
           fontsize=18, fontweight='bold', color=nutrifit_green, y=0.92)

# Draw the table explicitly
ax.add_table(table)

# Save the figure with different format options
plt.savefig('nutrifit_test_cases.png', dpi=300, bbox_inches='tight', pad_inches=0.5, format='png')

# Try an alternative format as well
plt.savefig('nutrifit_test_cases.pdf', format='pdf', bbox_inches='tight', pad_inches=0.5)

print("NutriFit test case tables created as 'nutrifit_test_cases.png' and 'nutrifit_test_cases.pdf'") 