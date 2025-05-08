import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from matplotlib.colors import LinearSegmentedColormap
import matplotlib.patheffects as PathEffects

# Set up the figure with higher resolution
plt.figure(figsize=(12, 8), dpi=100)
ax = plt.gca()
ax.set_facecolor('white')

# Define NutriFit colors
nutrifit_green = '#4CAF50'
nutrifit_blue = '#2196F3'
nutrifit_light_blue = '#BBDEFB'
nutrifit_light_green = '#C8E6C9'

# Set title
title = plt.title('NutriFit Sprint 3 Architecture', fontsize=18, fontweight='bold', color=nutrifit_green, pad=20)

# Draw the outer container box
outer_box = patches.Rectangle((0.05, 0.05), 0.9, 0.9, fill=False, linewidth=2, 
                           edgecolor='gray', linestyle='-')
ax.add_patch(outer_box)

# Draw the microservices container with a border
microservices_box = patches.Rectangle((0.08, 0.1), 0.84, 0.75, fill=True, 
                                    linewidth=1.5, edgecolor='gray', 
                                    facecolor='#F5F5F5', alpha=0.3)
ax.add_patch(microservices_box)

# Add microservices label with background
microservices_label = patches.Rectangle((0.08, 0.82), 0.15, 0.03, fill=True,
                                    linewidth=1, edgecolor='gray', 
                                    facecolor=nutrifit_light_blue, alpha=0.8)
ax.add_patch(microservices_label)
plt.text(0.155, 0.835, 'Microservices', fontsize=12, fontweight='bold', 
        color='black', ha='center', va='center')

# User Browser box - centered at top
user_browser_x = 0.5
user_browser_y = 0.75
user_browser_width = 0.24
user_browser_height = 0.06

# Add shadow effect for 3D look
shadow = patches.Rectangle((user_browser_x+0.003, user_browser_y-0.003), 
                        user_browser_width, user_browser_height, 
                        fill=True, linewidth=0, facecolor='gray', alpha=0.3)
ax.add_patch(shadow)

# Main box
browser_box = patches.Rectangle((user_browser_x, user_browser_y), 
                             user_browser_width, user_browser_height, 
                             fill=True, linewidth=1.5, edgecolor='gray', facecolor='white')
ax.add_patch(browser_box)

# Component circle
circle = patches.Circle((user_browser_x+0.03, user_browser_y+user_browser_height/2), 
                     0.015, fill=True, edgecolor='black', facecolor=nutrifit_green)
ax.add_patch(circle)
plt.text(user_browser_x+0.03, user_browser_y+user_browser_height/2, 'C', 
       fontsize=8, ha='center', va='center', color='white', fontweight='bold')

# Browser label
plt.text(user_browser_x+0.14, user_browser_y+user_browser_height/2, 'User Browser', 
       fontsize=11, fontweight='bold', ha='center', va='center')

# HTTP arrow
plt.annotate("HTTP/HTTPS", 
           xy=(user_browser_x+user_browser_width/2, user_browser_y), 
           xytext=(user_browser_x+user_browser_width/2, user_browser_y-0.05), 
           arrowprops=dict(arrowstyle="->", color=nutrifit_blue, linewidth=1.5), 
           ha='center', va='center', fontsize=9, color=nutrifit_blue)

# Create function to generate service boxes with consistent styling
def create_service_box(x, y, width, height, label, sublabel=None, component_x_offset=0.03):
    # Shadow for 3D effect
    shadow = patches.Rectangle((x+0.003, y-0.003), width, height, 
                           fill=True, linewidth=0, facecolor='gray', alpha=0.3)
    ax.add_patch(shadow)
    
    # Main box
    box = patches.Rectangle((x, y), width, height, 
                         fill=True, linewidth=1.5, edgecolor='gray', facecolor='white')
    ax.add_patch(box)
    
    # Component circle
    circle = patches.Circle((x+component_x_offset, y+height/2), 0.015, 
                         fill=True, edgecolor='black', facecolor=nutrifit_green)
    ax.add_patch(circle)
    plt.text(x+component_x_offset, y+height/2, 'C', 
           fontsize=8, ha='center', va='center', color='white', fontweight='bold')
    
    # Main label - centered or offset depending on whether there's a circle
    if component_x_offset > 0:
        text_x = x + width/2 + component_x_offset/2
    else:
        text_x = x + width/2
        
    plt.text(text_x, y+height*0.6, label, 
           fontsize=10, fontweight='bold', ha='center', va='center')
    
    # Optional sublabel
    if sublabel:
        plt.text(text_x, y+height*0.35, sublabel, 
               fontsize=8, ha='center', va='center')
    
    # Return center coordinates for arrows
    return x + width/2, y + height/2

# Define a common bottom y-position for all bottom row services
bottom_y = 0.25

# Visualization Service
vis_x = 0.38
vis_y = 0.62
vis_width = 0.24
vis_height = 0.06
vis_center_x, vis_center_y = create_service_box(vis_x, vis_y, vis_width, vis_height, 
                                             'Visualization Service', '(Streamlit + Plotly)')

# Record Management Service
record_x = 0.38
record_y = 0.48
record_width = 0.24
record_height = 0.06
record_center_x, record_center_y = create_service_box(record_x, record_y, record_width, record_height, 
                                                   'Nutrition Record Management')

# Bottom row services
service_width = 0.18
service_height = 0.06

# Notification Service
notif_x = 0.15
notif_center_x, notif_center_y = create_service_box(notif_x, bottom_y, service_width, service_height, 
                                                 'Notification Service')

# Validation Service
valid_x = 0.35
valid_center_x, valid_center_y = create_service_box(valid_x, bottom_y, service_width, service_height, 
                                                 'Validation Service')

# Audit Service
audit_x = 0.55
audit_center_x, audit_center_y = create_service_box(audit_x, bottom_y, service_width, service_height, 
                                                'Audit Service')

# Data Service
data_x = 0.75
data_center_x, data_center_y = create_service_box(data_x, bottom_y, service_width, service_height, 
                                               'Data Service')

# Database
db_x = 0.84
db_y = 0.12
db_width = 0.15
db_height = 0.05

# Database shape with shadow
shadow_ellipse_top = patches.Ellipse((db_x, db_y+db_height+0.002), db_width, db_height/2, 
                                   fill=True, edgecolor=None, facecolor='gray', alpha=0.3)
shadow_ellipse_bottom = patches.Ellipse((db_x, db_y-0.002), db_width, db_height/2, 
                                      fill=True, edgecolor=None, facecolor='gray', alpha=0.3)
shadow_rect = patches.Rectangle((db_x-db_width/2, db_y-0.002), db_width, db_height+0.004, 
                              fill=True, edgecolor=None, facecolor='gray', alpha=0.3)

ax.add_patch(shadow_rect)
ax.add_patch(shadow_ellipse_bottom)
ax.add_patch(shadow_ellipse_top)

# Actual database
ellipse_top = patches.Ellipse((db_x, db_y+db_height), db_width, db_height/2, 
                           fill=True, edgecolor='gray', facecolor=nutrifit_light_green, linewidth=1)
ellipse_bottom = patches.Ellipse((db_x, db_y), db_width, db_height/2, 
                              fill=True, edgecolor='gray', facecolor=nutrifit_light_green, linewidth=1)
rectangle = patches.Rectangle((db_x-db_width/2, db_y), db_width, db_height, 
                           fill=True, edgecolor='gray', facecolor=nutrifit_light_green, linewidth=1)

ax.add_patch(rectangle)
ax.add_patch(ellipse_bottom)
ax.add_patch(ellipse_top)
plt.text(db_x, db_y+db_height/2, 'SQLite Database', fontsize=9, ha='center', 
        va='center', fontweight='bold')

# Function to create labeled arrows with small boxes around the labels
def create_labeled_arrow(start_x, start_y, end_x, end_y, label, rad=0.2, fontsize=8):
    # Draw the arrow
    arrow = plt.annotate("", 
                      xy=(end_x, end_y), 
                      xytext=(start_x, start_y),
                      arrowprops=dict(arrowstyle="->", connectionstyle=f"arc3,rad={rad}", 
                                    color=nutrifit_blue, linewidth=1.5))
    
    # Calculate midpoint for label placement
    mid_x = (start_x + end_x) / 2
    mid_y = (start_y + end_y) / 2
    
    # Add offset based on curvature
    if rad != 0:
        offset_x = -rad * (end_y - start_y) * 0.2
        offset_y = rad * (end_x - start_x) * 0.2
        mid_x += offset_x
        mid_y += offset_y
    
    # Add label with a small text box
    text = plt.text(mid_x, mid_y, label, 
                  fontsize=fontsize, ha='center', va='center',
                  bbox=dict(boxstyle="round,pad=0.2", facecolor='white', 
                          edgecolor='lightgray', alpha=0.8))

# Draw all the arrows with labels
# 1. Visualization to Record Management
create_labeled_arrow(vis_center_x-0.05, vis_y, record_center_x-0.05, record_y+record_height, 
                  "1. Add/Update/Delete Request", rad=0)

# 10. Record Management to Visualization
create_labeled_arrow(record_center_x+0.05, record_y+record_height, vis_center_x+0.05, vis_y, 
                   "10. Operation Status/Result", rad=0)

# 2. Record Management to Validation
create_labeled_arrow(record_center_x-0.08, record_y, valid_center_x, bottom_y+service_height, 
                   "2. Validate Data", rad=-0.1)

# 3. Validation to Record Management
create_labeled_arrow(valid_center_x+0.03, bottom_y+service_height, record_center_x-0.03, record_y, 
                   "3. Validation Result", rad=0.1)

# 4. Record Management to Data Service
create_labeled_arrow(record_center_x+0.1, record_y, data_center_x, bottom_y+service_height, 
                   "4. CRUD Operation", rad=0.2)

# 7. Data Service to Record Management
create_labeled_arrow(data_center_x-0.03, bottom_y+service_height, record_center_x+0.12, record_y, 
                   "7. Operation Result", rad=0.2)

# 8. Record Management to Notification Service
create_labeled_arrow(record_center_x-0.1, record_y, notif_center_x, bottom_y+service_height, 
                   "8. Notify User", rad=-0.2)

# 9. Record Management to Audit Service
create_labeled_arrow(record_center_x+0.05, record_y, audit_center_x, bottom_y+service_height, 
                   "9. Log Change", rad=0.2)

# 5. Data Service to Database
create_labeled_arrow(data_center_x+0.05, bottom_y, db_x, db_y+db_height, 
                   "5. Read/Write Data", rad=0.1)

# 6. Database to Data Service
create_labeled_arrow(db_x-0.04, db_y+db_height, data_center_x-0.05, bottom_y, 
                   "6. Data/Status", rad=0.1)

# Add a footer
plt.text(0.5, 0.07, 'NutriFit Application - Nutrition Record Management & Notification System', 
        fontsize=10, ha='center', color='gray', style='italic')

# Remove axes
plt.axis('off')

# Save the diagram with higher quality
plt.tight_layout()
plt.savefig('nutrifit_sprint3_architecture.png', dpi=300, bbox_inches='tight')
plt.close()

print("Improved NutriFit Sprint 3 Architecture diagram created as 'nutrifit_sprint3_architecture.png'") 